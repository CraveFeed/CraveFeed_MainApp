"use client"
import { useEffect, useState } from "react";
import { fetchPost } from "@/lib/features/services/testThunk";
import { increment , decrement , incrementByAmount } from "@/lib/features/counter/counterSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";

export default function Home() {
  const [input, setInput] = useState<number>(0);
  const dispatch = useAppDispatch();
  const counter = useAppSelector(state => state.counter.value);
  const post = useAppSelector(state => state.post);
  const router = useRouter();

  useEffect(() => {
    router.push("/home");
    dispatch(fetchPost());
  },[])

  return (
    <main>
      <p>This is counter</p>
      <button onClick={() => { dispatch(increment()) }}>Increment</button>
      <button onClick={() => { dispatch(decrement()) }}>Decrement</button>
      <input type="number" onChange={(e) => setInput(Number(e.target.value))} />
      <button onClick={() => { dispatch(incrementByAmount(input)) }}>Increment</button>
      <div style={{ display : "flex" , flexDirection : 'column' , justifyContent : "center" , alignContent : 'center' , alignItems : "center"}}>
        <button>{`${post.userId}`}</button>
        <button>{post.todo}</button>
        <button>{`${post.completed}`}</button>
      </div>

      <p>{counter}</p>
      This is the Login/SignUp page
    </main>
  );
}