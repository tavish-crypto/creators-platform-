import { useState } from "react";
function ConnectionTest(){
    const [message,setMessage] =  useState("")
    const [loading,setLoading] = useState(false)

    async function testConnection(){
        setLoading(true)
        try{
            const response = await fetch("/api/health");
            const data = await response.json()
            setMessage("✅" + data.message)
        }catch(error){
            setMessage("❌ Failed to connect to backend")
        }
        setLoading(false);
    }
    return(
        <div
        style={{
            marginTop: "40px",
            border: "1px solid #ccc",
            padding: "20px",
        }}
        >
            <h2>Backend Connection Test</h2>
            <button
            onClick={testConnection}
            >
                {loading ? "Testing...": "Test Connection"}
            </button>
            <p>{message}</p>
        </div>
    )
}
export default ConnectionTest;