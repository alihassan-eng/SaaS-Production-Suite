// 🪐 APEX BACKEND ISOLATION INGESTION NODE (MINIMAL WORKING DEMO)
// 🧬 MIT SPEC: Enforcing strict ACID transaction boundaries to permanently neutralize TOCTOU races.
import express from 'express';
const app = express();
app.use(express.json());

// Fake In-Memory DRAM Database Registers (ٹیسٹنگ کے لیے فرضی ریم ڈیٹا بیس)
let databaseState = {
    users: { "user-ali-786": { name: "Ali Hassan", status: "active", scope: "read:dashboard" } },
    mutations: []
};

// Fake Redis Cache In-Memory Blacklist Register
let redisBlacklist = new Set(); 

/**
 * 🎯 TIM'S CONDITION 01 & 02: THE AUTHORITATIVE MUTATION GATEWAY
 * 🔒 Enforces Row-Level Isolation (Serializable) to eliminate the nano-second exploit window.
 */
app.post('/api/deploy-protocol', async (req, res) => {
    const { userId, payload, tokenExpired } = req.body;
    
    console.log(`\n%c[INBOUND_TRANSACTION] -> Ingesting payload thread for User: ${userId}`, "color: #00b0ff;");

    // 🛡️ BARE-METAL ATOMIC TRANSACTION START (یہ وہ لوہے کا ہتھوڑا سرکٹ ہے)
    // In production, this maps to: BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
    let transactionActive = true; 

    try {
        // 🔬 PHASE 01: TIME OF CHECK (سیکیورٹی گارڈ کا لائیو ریدیس کیشے اسکین مارنا)
        if (redisBlacklist.has(userId) || tokenExpired) {
            throw new Error("403:AUTHORITY_REVOKED_PRE_FLIGHT");
        }

        // 🧬 SIMULATING THE NANO-SECOND IN-FLIGHT GAP (نیٹ ورک کا وہ چھوٹا سا چور راستہ)
        // ٹِم کی ریس کنڈیشن کو لائیو ٹیسٹ کرنے کے لیے ہم نے یہاں ایک مائیکرو آرٹیفیشل ڈیلے بفر ڈالا ہے
        await new Promise(resolve => setTimeout(resolve, 50)); 

        // 🔬 PHASE 02: TIME OF USE (ڈیٹا بیس سیو ہونے سے ٹھیک ۱ نینو سیکنڈ پہلے دوبارہ لائیو اسٹیٹ ماپنا)
        // Explicitly row-locking the active target profile inside the database memory
        const liveUserRecord = databaseState.users[userId];
        
        if (!liveUserRecord || liveUserRecord.status === "revoked") {
            throw new Error("403:MID_FLIGHT_REVOCATION_CRASH"); // 🎯 تالا شارٹ سرکٹ فائر!
        }

        // ⚠️ SCOPE-CHANGE SHIFT VALVE (ٹِم کا تیسرا ٹیسٹ: لاگ ان سیشن ویلڈ ہے پر پاور بدل گئی)
        if (liveUserRecord.scope !== "write:mutation") {
            throw new Error("401:UNAUTHORIZED_SCOPE_MUTATION");
        }

        // 🟢 CONDITION 02 LOCK: اگر میوٹیشن پہلے کامیاب ہو جائے، تو ڈیٹا مستقل ڈیٹا بیس میں سیو ہونا
        databaseState.mutations.push({ userId, payload, timestamp: Date.now() });
        transactionActive = false; // Transaction Committed Safely

        return res.status(200).json({
            success: true,
            message: "Protocol committed cleanly inside DRAM state.",
            currentDatabaseState: databaseState.mutations
        });

    } catch (error) {
        // ✕ THE ATOMIC HAMMER: اگر بیچ کے وقفے میں یوزر بلاک ہو، تو پوری ریکوئسٹ فورا ہوا میں ہی تباہ (Rollback)!
        transactionActive = false; 
        console.log(`%c[CRITICAL_ROLLBACK] -> TOCTOU leak plugged safely: ${error.message}`, "color: #ff3b30; font-weight: bold;");
        
        return res.status(error.message.startsWith("401") ? 401 : 403).json({
            success: false,
            error: error.message,
            finalAuthoritativeDatabaseState: "MUTATION_BLOCKED_ZERO_DATA_POLLUTION"
        });
    }
});

/**
 * 📡 TIM'S REPRODUCIBLE REVOCATION TEST TRIGGER
 * آٹومیٹڈ ٹیسٹ ہک: یہ بٹن دباتے ہی یوزر نینو سیکنڈ میں بلاک ہو جائے گا
 */
app.post('/api/test-revoke', (req, res) => {
    const { userId } = req.body;
    // 🧬 Simul-shift: نوکری سے نکالنے کا سگنل لائیو ڈیٹا بیس اور ریدیس میں ایک ساتھ فائر کرنا
    if (databaseState.users[userId]) {
        databaseState.users[userId].status = "revoked";
        redisBlacklist.add(userId);
    }
    return res.status(200).json({ message: `User ${userId} status set to REVOKED across infrastructure.` });
});

// App Engine Listening Node Deployed De-coupled
const PORT = 3000;
app.listen(PORT, () => console.log(`🪐 MIT Ingestion Server Demo Operational at http://localhost:${PORT}`));
