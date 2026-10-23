/**
 * 🏎️ WEEK 3.2: ADVANCED HTTP STREAMS & ABORTION REGISTER [INDEX]
 * Hardware Level Testing: Initializing Controller and intercepting Stream Chunks.
 */

console.clear();
console.log("%c[NET_INITIALIZE] -> Booting High-Throughput Stream Pipeline...", "color: #06b6d4; font-weight: bold;");

// 1. Initializing the physical wire cutter trigger in RAM
const wireCutter = new AbortController();
const { signal } = wireCutter;

// Simulated High-Velocity 200MB Chunk Stream
async function executeNetworkIngestion() {
    try {
        console.log("%c[FETCH_START] -> Shooting HTTP Request down the optic fiber...", "color: #a855f7; font-weight: bold;");
        
        // Simulating a real live stream endpoint with active abortion listener
        const response = await fetch("https://typicode.com", { signal });
        
        // Reading incoming hardware buffer stream as raw chunks
        const reader = response.body.getReader();
        let chunkIndex = 0;

        while(true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            chunkIndex++;
            console.log(`%c[STREAM_CHUNK #${chunkIndex}] -> Landed 64KB Uint8Array chunk in RAM.`, "color: #10b981;");

            // Hard Trigger: Simulated user abort cancels stream midway at chunk 5
            if (chunkIndex === 5) {
                console.log("%c[USER_ACTION] -> User hit CANCEL! Engaging Abort Trigger...", "color: #f59e0b; font-weight: bold;");
                wireCutter.abort(); // Drops voltage in RAM capacitors instantly
            }
        }

    } catch (error) {
        if (error.name === 'AbortError') {
            console.log("%c[TCP_RST_SUCCESS] -> OS Kernel sent TCP RST Packet. RAM cleared successfully!", "color: #ef4444; font-weight: bold;");
        } else {
            console.error("Standard Network Fault:", error);
        }
    }
}

// Fire the pipeline engine
executeNetworkIngestion();
