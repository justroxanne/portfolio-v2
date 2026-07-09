import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(Draggable, InertiaPlugin);

type LoopConfig = {
  repeat?: boolean;
  paused?: boolean;
  draggable?: boolean;
  speed?: number;
  snap?: number | boolean;
  paddingRight?: string;
  reversed?: boolean;
};

export const horizontalLoop = (
  container: HTMLDivElement,
  items: HTMLDivElement[],
  config: LoopConfig = {},
) => {
  items = gsap.utils.toArray(items);
  const tl = gsap.timeline({
    repeat: config.repeat === true ? -1 : 0,
    paused: config.paused,
    defaults: { ease: "none" },
    onReverseComplete: () => {
      tl.totalTime(tl.rawTime() + tl.duration() * 100);
    },
  });

  // container.addEventListener("mouseenter", () =>
  //   gsap.to(tl, {
  //     timeScale: 0,
  //     overwrite: true,
  //   }),
  // );
  // container.addEventListener("mouseleave", () =>
  //   gsap.to(tl, {
  //     timeScale: 1,
  //     overwrite: true,
  //   }),
  // );

  const length = items.length;
  const startX = items[0].offsetLeft;
  const times: number[] = [];
  const widths: number[] = [];
  const xPercents: number[] = [];
  const pixelsPerSecond = (config.speed || 1) * 100;
  const snap =
    config.snap === false
      ? (v: number) => v
      : gsap.utils.snap((config.snap as number) || 1);

  let curIndex = 0;

  const populateWidths = () => {
    items.forEach((item, i) => {
      widths[i] = parseFloat(gsap.getProperty(item, "width", "px") as string);
      xPercents[i] =
        snap(
          parseFloat(gsap.getProperty(item, "x", "px") as string) / widths[i],
        ) *
          100 +
        parseFloat(gsap.getProperty(item, "xPercent") as string);
    });
  };

  const getTotalWidth = () => {
    const last = items[length - 1];
    return (
      last.offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      last.offsetWidth *
        parseFloat(gsap.getProperty(last, "scaleX") as string) +
      (parseFloat(config?.paddingRight as string) || 0)
    );
  };

  populateWidths();
  gsap.set(items, { xPercent: (i) => xPercents[i] });
  gsap.set(items, { x: 0 });
  const totalWidth = getTotalWidth();

  for (let i = 0; i < length; i++) {
    const item = items[i];
    const curX = (xPercents[i] / 100) * widths[i];
    const distanceToStart = item.offsetLeft + curX - startX;
    const distanceToLoop =
      distanceToStart +
      widths[i] * parseFloat(gsap.getProperty(item, "scaleX") as string);

    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0,
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100,
          ),
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond,
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);

    times[i] = distanceToStart / pixelsPerSecond;
  }

  function toIndex(
    index: number,
    vars: {
      modifiers?: { time: (time: number) => number };
      overwrite?: boolean;
    } = {},
  ) {
    if (Math.abs(index - curIndex) > length / 2) {
      index += index > curIndex ? -length : length;
    }

    const newIndex = gsap.utils.wrap(0, length, index);
    let time = times[newIndex];

    if (time > tl.time() !== index > curIndex) {
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }

    curIndex = newIndex;
    vars.overwrite = true;

    return tl.tweenTo(time, vars);
  }

  tl.next = (vars = {}) => toIndex(curIndex + 1, vars);
  tl.previous = (vars = {}) => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index: number, vars = {}) => toIndex(index, vars);
  tl.updateIndex = () => {
    curIndex = Math.round(tl.progress() * (items.length - 1));
  };
  tl.times = times;
  tl.progress(1, true).progress(0, true);

  if (config.reversed) {
    tl.vars?.onReverseComplete?.();
    tl.reverse();
  }

  if (config.draggable && typeof Draggable === "function") {
    const wrap = gsap.utils.wrap(0, 1);
    const proxy = document.createElement("div");

    let ratio = 1 / length;
    let startProgress = 0;
    let hasHandedOff = false;

    const draggable = Draggable.create(proxy, {
      trigger: container,
      type: "x",
      onPress() {
        hasHandedOff = false;
        tl.pause();
        startProgress = tl.progress();
        tl.progress(0);
        populateWidths();
        const totalWidth = getTotalWidth();
        ratio = 1 / totalWidth;
        tl.progress(startProgress);
      },
      onDrag: () => {
        tl.progress(
          wrap(startProgress + (draggable.startX - draggable.x) * ratio),
        );
      },
      onThrowUpdate: () => {
        tl.progress(
          wrap(startProgress + (draggable.startX - draggable.x) * ratio),
        );

        if (hasHandedOff || config.paused) return;

        const v = InertiaPlugin.getVelocity(proxy, "x");
        const naturalVelocity = -pixelsPerSecond;

        const sameDirection = Math.sign(v) === Math.sign(naturalVelocity);
        const closeEnought =
          Math.abs(v - naturalVelocity) < pixelsPerSecond * 0.15;

        if (sameDirection && closeEnought) {
          hasHandedOff = true;
          draggable.tween.kill();
          gsap.set(proxy, { x: 0 });
          tl.updateIndex();
          tl.play();
        }
      },
      inertia: true,
      edgeResistance: 0.75,
      snap: {
        x: (endValue) => {
          const slideWidth = widths[0];
          return Math.round(endValue / slideWidth) * slideWidth;
        },
      },
      onRelease: () => tl.updateIndex(),
      onThrowComplete: () => {
        if (!hasHandedOff && !config.paused) {
          gsap.set(proxy, { x: 0 });
          tl.updateIndex();
          tl.play();
        }
      },
    })[0];
  }

  return tl;
};
