import { useEffect, useState } from 'react';
import { useRouter } from "next/router";

const Test = () => {
  const router = useRouter();
  const { pid = '' } = router.query as { pid: string };
  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    setAddress(pid);
    localStorage.setItem('testAddress', pid);
  }, [pid]);

  return (
    <div>test: {address}</div>
  )
}

export default Test;