import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const ExternalPortal: React.FC<any> = ({ children }: any) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted
    ? ReactDOM.createPortal(
        children,
        document.getElementById("external-portal") as HTMLElement
      )
    : null;
};

export default ExternalPortal;
