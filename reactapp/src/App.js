import { useEffect, useState, useRef } from "react";
import { NotificationFactory } from "./NotificationFactory";

function App() {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [timeState, setTimeState] = useState(8);

  const time = useRef(8);

  const notification = new NotificationFactory();

  useEffect(() => {
    notification.registerServiceWorker("/");
    notification.requestPermission();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendNotification = () => {
    notification.display();

    setButtonDisabled(true);

    setTimeout(() => {
      notification.display();
    }, 9000);

    let interval = setInterval(() => {
      time.current = time.current - 1;
      setTimeState(time.current);

      if (time.current === -1) {
        clearInterval(interval);
        setTimeState(8);
        setButtonDisabled(false);
        time.current = 8;
      }
    }, 1000);
  };

  return (
    <div className="App">
      <button disabled={buttonDisabled} onClick={() => sendNotification()}>
        Click me
      </button>
      {buttonDisabled && <p>Next notification will be shown in {timeState}</p>}
    </div>
  );
}

export default App;
