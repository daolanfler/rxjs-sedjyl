import {
  Observable,
  Subject,
  animationFrameScheduler,
  distinctUntilChanged,
  fromEvent,
  interval,
  map,
  merge,
  mergeWith,
  retry,
  scan,
  withLatestFrom,
} from "rxjs";
import "./style.css";

const stage = document.getElementById("stage") as HTMLCanvasElement;
const context = stage.getContext("2d") as CanvasRenderingContext2D;
context.fillStyle = "green";

const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 20;

const BALL_RADIUS = 10;

const BRICK_ROWS = 5;
const BRICK_COLUMNS = 7;
const BRICK_HEIGHT = 20;
const BRICK_GAP = 3;

const TICKER_INTERVAL = Math.ceil(1000 / 60);

function drawIntro() {
  context.clearRect(0, 0, stage.width, stage.height);
  context.textAlign = "center";
  context.font = "24px Courier New";
  context.fillText(
    `Press [<] and [>] to start`,
    stage.width / 2,
    stage.height / 2
  );
}

function drawGameover(text: string) {
  context.clearRect(
    stage.width / 4,
    stage.height / 3,
    stage.width / 2,
    stage.height / 3
  );
  context.textAlign = "center";
  context.font = "24px Courier New";
  context.fillText(text, stage.width / 2, stage.height / 2);
}

function drawScore(score: number) {
  context.textAlign = "left";
  context.font = "16px Courier New";
  context.fillText(`Score: ${score}`, BRICK_GAP, 16);
}

function drawPaddle(position: number) {
  context.beginPath();
  context.rect(
    position - PADDLE_WIDTH / 2,
    context.canvas.height - PADDLE_HEIGHT,
    PADDLE_WIDTH,
    PADDLE_HEIGHT
  );
  context.fill();
  context.closePath();
}

interface Ball {
  position: {
    x: number;
    y: number;
  };
  direction: {
    x: number;
    y: number;
  };
}

function drawBall(ball: Ball) {
  context.beginPath();
  context.arc(ball.position.x, ball.position.y, BALL_RADIUS, 0, Math.PI * 2);
  context.fill();
  context.closePath();
}

interface Brick {
  /** 矩形中心 x */
  x: number;
  /** 矩形中心 y */
  y: number;
  width: number;
  height: number;
}

function drawBrick(brick: Brick) {
  context.beginPath();
  context.rect(
    brick.x - brick.width / 2,
    brick.y - brick.height / 2,
    brick.width,
    brick.height
  );
  context.fill();
  context.closePath();
}

function drawBricks(bricks: Brick[]) {
  bricks.forEach((brick) => drawBrick(brick));
}

const ticker$ = interval(TICKER_INTERVAL, animationFrameScheduler).pipe(
  map<number, Tick>(() => ({
    time: Date.now(),
    deltaTime: null,
  })),
  scan((previous, current) => ({
    time: current.time,
    deltaTime: (current.time - previous.time) / 1000,
  }))
);

const PADDLE_CONTROL: Record<string, number> = {
  ArrowLeft: -1,
  ArrowRight: 1,
};

const keys$ = merge(
  fromEvent<KeyboardEvent>(document, "keydown").pipe(
    map((e) => PADDLE_CONTROL[e.key] || 0)
  ),
  fromEvent<KeyboardEvent>(document, "keyup").pipe(
    map((e) => PADDLE_CONTROL[e.key] || 0)
  )
).pipe(distinctUntilChanged());

const PADDLE_SPEED = 240;

const createPaddle$ = (
  ticker$: Observable<{
    time: number;
    deltaTime: null | number;
  }>
) =>
  ticker$.pipe(
    withLatestFrom(keys$),
    scan((position, [ticker, direction]) => {
      const nextPosition =
        position + direction * (ticker.deltaTime || 0) * PADDLE_SPEED;
      return Math.max(
        Math.min(nextPosition, stage.width - PADDLE_WIDTH / 2),
        PADDLE_WIDTH / 2
      );
    }, stage.width / 2),
    distinctUntilChanged()
  );

/**
 * paddle 和 ball 是否碰撞
 * @param paddle paddle x
 * @param ball
 */
function isHit(paddle: number, ball: Ball) {
  return (
    ball.position.x > paddle - PADDLE_WIDTH / 2 &&
    ball.position.x < paddle + PADDLE_WIDTH / 2 &&
    ball.position.y > stage.height - PADDLE_HEIGHT - BALL_RADIUS
  );
}

function isCollision(brick: Brick, ball: Ball) {
  return (
    ball.position.x + ball.direction.x > brick.x - brick.width / 2 &&
    ball.position.x + ball.direction.x < brick.x + brick.width / 2 &&
    ball.position.y + ball.direction.y > brick.y - brick.height / 2 &&
    ball.position.y + ball.direction.y < brick.y + brick.height / 2
  );
}

interface State {
  ball: Ball;
  bricks: Brick[];
  collisions?: {
    paddle: boolean;
    floor: boolean;
    wall: boolean;
    ceiling: boolean;
    brick: boolean;
  };
  score: number;
}

function initState(): State {
  return {
    ball: {
      position: {
        x: stage.width / 2,
        y: stage.height / 2,
      },
      direction: {
        x: 2,
        y: 2,
      },
    },
    bricks: createBricks(),
    score: 0,
  };
}

function createBricks(): Brick[] {
  let width =
    (stage.width - BRICK_GAP - BRICK_GAP * BRICK_COLUMNS) / BRICK_COLUMNS;
  let bricks: Brick[] = [];

  for (let i = 0; i < BRICK_ROWS; i++) {
    for (let j = 0; j < BRICK_COLUMNS; j++) {
      bricks.push({
        x: j * (width + BRICK_GAP) + width / 2 + BRICK_GAP,
        y: i * (BRICK_HEIGHT + BRICK_GAP) + BRICK_HEIGHT / 2 + BRICK_GAP + 20,
        width,
        height: BRICK_HEIGHT,
      });
    }
  }

  return bricks;
}

const BALL_SPEED = 60;

interface Tick {
  time: number;
  deltaTime: null | number;
}

const createState$ = (ticker$: Observable<Tick>, paddle$: Observable<number>) =>
  ticker$.pipe(
    withLatestFrom(paddle$),
    scan(({ ball, bricks, score }, [ticker, paddle]) => {
      let remainingBicks: Brick[] = [];
      const collisions = {
        paddle: false,
        floor: false,
        wall: false,
        ceiling: false,
        brick: false,
      };
      ball.position.x =
        ball.position.x +
        ball.direction.x * (ticker.deltaTime || 0) * BALL_SPEED;
      ball.position.y =
        ball.position.y +
        ball.direction.y * (ticker.deltaTime || 0) * BALL_SPEED;
      bricks.forEach((brick) => {
        if (!isCollision(brick, ball)) {
          remainingBicks.push(brick);
        } else {
          collisions.brick = true;
          score += 10;
        }
      });
      collisions.paddle = isHit(paddle, ball);

      if (
        ball.position.x < BALL_RADIUS ||
        ball.position.x > stage.width - BALL_RADIUS
      ) {
        ball.direction.x = -ball.direction.x;
        collisions.wall = true;
      }

      collisions.ceiling = ball.position.y < BALL_RADIUS;
      if (collisions.ceiling || collisions.brick || collisions.paddle) {
        ball.direction.y = -ball.direction.y;
      }
      return {
        ball,
        bricks: remainingBicks,
        collisions,
        score,
      };
    }, initState())
  );

let restart: Subject<never>;

const game$ = new Observable<[Tick, number, State]>((observer) => {
  drawIntro();
  restart = new Subject();

  const paddle$ = createPaddle$(ticker$);
  const state$ = createState$(ticker$, paddle$);

  ticker$
    .pipe(withLatestFrom(paddle$, state$))
    .pipe(mergeWith(restart))
    .subscribe(observer);
});

game$
  .pipe(
    retry({
      delay: 1000,
    })
  )
  .subscribe(([ticker, paddle, state]) => {
    context.clearRect(0, 0, stage.width, stage.height);
    drawPaddle(paddle);
    drawBall(state.ball);
    drawBricks(state.bricks);
    drawScore(state.score);

    if (state.ball.position.y > stage.height - BALL_RADIUS) {
      drawGameover('GAME OVER')
      restart.error("game over");
    }

    if(state.bricks.length === 0) {
      drawGameover('Congradulations!')
      restart.error("you win");
    }
  });
