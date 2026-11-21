"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";
export default function AuthCallback(){
 const router=useRouter(); const params=useSearchParams(); const [message,setMessage]=useState("กำลังเข้าสู่ระบบ...");
 useEffect(()=>{(async()=>{const code=params.get("code");if(code){const {error}=await supabase.auth.exchangeCodeForSession(code);if(error){setMessage("เข้าสู่ระบบไม่สำเร็จ กรุณากลับไปลองใหม่");return;}}const {data}=await supabase.auth.getUser();if(data.user)router.replace("/admin");else router.replace("/login");})();},[params,router]);
 return <main className="login-shell"><div className="login-card"><p>{message}</p></div></main>;
}
