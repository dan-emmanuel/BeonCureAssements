// utils/timerUtil.ts
const timers: Record<string, number> = {};

class TimerUtil {
  static start(id: string): void {
    timers[id] = Date.now();
  }

  static stop(id: string): number {
    if (!timers[id]) {
      throw new Error(`No timer started for ID: ${id}`);
    }
    const elapsed = Date.now() - timers[id];
    delete timers[id];  // Clean up to avoid memory leaks
    return elapsed;
  }
}

export default TimerUtil;
