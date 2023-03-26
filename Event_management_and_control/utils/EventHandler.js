const { EventEmitter } = require('node:events');

class EventHandler extends EventEmitter {

  instance = null;

  //יוצר אובייקט של אירוע 
  static CreateInstance() {
    if (!this.instance)
      this.instance = new EventHandler();

    return this.instance;
  }

  //  יוצר אובייקט של אירוע אם לא לקיים ומיצר את האירוע עצמו 
  static CreateEvent(eventName, callback) {
    this.instance = EventHandler.CreateInstance();
    this.instance.on(eventName, callback);
  }

  // מתי שקוראים לפונקציה מופעל האירוע המתאים 
  static RunEvent(eventName, params = []) {
    this.instance = EventHandler.CreateInstance();
    this.instance.emit(eventName, params.join('\n**********\n'));
  }

}

module.exports = { EventHandler }