// clsUtil.ts
import { createNamespace, getNamespace } from 'cls-hooked';
import { v4 as uuidv4 } from 'uuid'; // Assuming you have the uuid package installed

export class CLSUtil {
  private static namespace = createNamespace('myApp');

  static setRequestId(requestId: string) {
    this.namespace.set('requestId', requestId);
  }

  static getRequestId(): string {
    return this.namespace.get('requestId');
  }

  static runWithId(fn: Function, requestId?: string) {
    return this.namespace.run(() => {
      this.setRequestId(requestId || `${uuidv4()}_backGened`);
      fn();
    });
  }
}