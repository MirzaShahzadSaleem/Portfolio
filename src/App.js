import React, { useCallback, useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";

export default function App() {
  const askRef = useRef(() => {});
  const [busy, setBusy] = useState(true);
  const onAsk = useCallback((q) => askRef.current(q), []);

  return (
    <div className="app">
      <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
      <Sidebar onAsk={onAsk} busy={busy} />
      <Chat askRef={askRef} onBusy={setBusy} />
    </div>
  );
}
