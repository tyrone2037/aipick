export interface GSAPTimeline {
  to(target: any, vars: any, position?: any): GSAPTimeline;
  tweenTo(time: number, vars?: any): GSAPTimeline;
  duration(): number;
  kill(): void;
}
export interface GSAPTween {
  kill (): void;
}
export const gsap: {
  set(target: any, vars: any): void;
  to(target: any, vars: any): GSAPTween;
  fromTo(target: any, fromVars: any, toVars: any): GSAPTween;
  timeline(vars?: any): GSAPTimeline;
};
