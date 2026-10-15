        const diagConsole = document.getElementById('diagConsole');
        const runPrimitiveTest = document.getElementById('runPrimitiveTest');
        const runReferenceTest = document.getElementById('runReferenceTest');
        const runTdzTest = document.getElementById('runTdzTest');

        const printLog = (msg) => {
            const row = document.createElement('div');
            row.innerHTML = `<span class="text-slate-600">[RAM_BUS]</span> &gt; ${msg}`;
            diagConsole.appendChild(row);
            diagConsole.scrollTop = diagConsole.scrollHeight;
        };

        // ========================================================
        // TEST 1: PRIMITIVE COPY (BY VALUE)
        // ========================================================
        runPrimitiveTest.addEventListener('click', () => {
            printLog("<span class='text-cyan-400'>Initializing Test 1...</span>");
            
            let originalAge = 25; // Original cell
            let clonedAge = originalAge; // Value duplicated to a new address
            
            printLog(`Allocated cell 'originalAge' with 25. Cloned to 'clonedAge'.`);
            
            // Mutating the clone
            clonedAge = 30;
            printLog(`Mutated 'clonedAge' to 30. Checking original cell state...`);
            printLog(`Result -> originalAge: <span class='text-emerald-400'>${originalAge}</span> | clonedAge: <span class='text-cyan-400'>${clonedAge}</span>`);
            printLog("<span class='text-slate-500'>Conclusion: Stack cells are 100% isolated. No leakage.</span>");
        });

        // ========================================================
        // TEST 2: REFERENCE COPY (BY POINTER)
        // ========================================================
        runReferenceTest.addEventListener('click', () => {
            printLog("<span class='text-amber-400'>Initializing Test 2...</span>");
            
            // Dynamic allocation inside Heap Memory Field
            let originalArray = ["BMW", "Audi"]; 
            let clonedArray = originalArray; // ONLY copies the hash key/pointer
            
            printLog(`Allocated array in Heap. Pointer mirrored in Stack.`);
            
            // Mutating the cloned link
            clonedArray.push("Lexus");
            printLog(`Pushed 'Lexus' into 'clonedArray'. Checking original array content...`);
            printLog(`Result -> originalArray: <span class='text-rose-400'>[${originalArray.join(', ')}]</span>`);
            printLog("<span class='text-slate-500'>Conclusion: Shared Heap reference mutated the original data block.</span>");
        });

        // ========================================================
        // TEST 3: TDZ DEADLOCK BREACH
        // ========================================================
        runTdzTest.addEventListener('click', () => {
            printLog("<span class='text-rose-400'>Initializing Test 3...</span>");
            printLog("Executing immediate out-of-order execution sequence...");
            
            try {
                // V8 Engine bypass protection via eval to prevent compile-time stoppage
                eval('printLog("Attempting register read..."); console.log(securedData); let securedData = 500;');
            } catch (error) {
                printLog(`<span class='text-rose-500 font-bold'>HARDWARE CRASH DETECTED:</span> ${error.message}`);
                printLog("<span class='text-slate-500'>Conclusion: TDZ lock successfully blocked the CPU pointer. Safety verified.</span>");
            }
        });
        // ================================================================
        // ////////////////////////////////////////////////////////////////
        // ================================================================
         const runtimeConsole = document.getElementById('runtimeConsole');
        const triggerStackBtn = document.getElementById('triggerStackBtn');
        const triggerHoistingBtn = document.getElementById('triggerHoistingBtn');

        const telemetryLog = (msg) => {
            const row = document.createElement('div');
            row.innerHTML = `<span class="text-slate-600">[V8_THREAD]</span> &gt; ${msg}`;
            runtimeConsole.appendChild(row);
            runtimeConsole.scrollTop = runtimeConsole.scrollHeight;
        };

        // ========================================================
        // TEST 1: CALL STACK LIFE CYCLE (PUSH & POP SIMULATION)
        // ========================================================
        
        // Target routines to push onto the stack
        function coreDatabaseQuery() {
            telemetryLog("<span class='text-rose-400'>[PUSH] -> coreDatabaseQuery() active on top of stack.</span>");
            telemetryLog("Reading specific RAM addresses... Data loaded.");
            telemetryLog("<span class='text-slate-500'>[POP] -> coreDatabaseQuery() complete. Cell deallocated.</span>");
        }

        function validateUserSession() {
            telemetryLog("<span class='text-amber-400'>[PUSH] -> validateUserSession() context active.</span>");
            // Nesting next stack frame
            coreDatabaseQuery();
            telemetryLog("<span class='text-slate-500'>[POP] -> validateUserSession() complete. Cell deallocated.</span>");
        }

        triggerStackBtn.addEventListener('click', () => {
            telemetryLog("<span class='text-cyan-400'>--- CALL STACK ACTIVATED ---</span>");
            telemetryLog("[PUSH] -> Global Click Listener Context established.");
            
            // Triggering thread entry point
            validateUserSession();
            
            telemetryLog("<span class='text-cyan-400'>--- STACK FLUSHED (LIFO CLEAR) ---</span>");
        });

        // ========================================================
        // TEST 2: HOISTING MECHANICS (OUT OF ORDER CALL)
        // ========================================================
        triggerHoistingBtn.addEventListener('click', () => {
            telemetryLog("<span class='text-amber-400'>--- HOISTING EVALUATION STARTED ---</span>");
            
            try {
                // EXECUTING THE CALL *BEFORE* THE DEFINITION LINE IN TEXT FLOW
                heapLoadedFunction(); 
            } catch(e) {
                telemetryLog(`Crash Check: ${e.message}`);
            }

            // The physical declaration is placed below the invocation line
            function heapLoadedFunction() {
                telemetryLog("Success -> <span class='text-emerald-400'>heapLoadedFunction() executed perfectly!</span>");
                telemetryLog("V8 verified: Entire code block was pre-copied to Heap during the Creation Phase [b].");
            }
        });
        // =========================================================
        // /////////////////////////////////////////////////////////
        // =========================================================
         const coercionConsole = document.getElementById('coercionConsole');
        const runPlusTest = document.getElementById('runPlusTest');
        const runMinusTest = document.getElementById('runMinusTest');
        const runLooseEquality = document.getElementById('runLooseEquality');
        const runStrictEquality = document.getElementById('runStrictEquality');
        const runFallbackTest = document.getElementById('runFallbackTest');

        const logicLog = (msg) => {
            const row = document.createElement('div');
            row.innerHTML = `<span class="text-slate-600">[COMPARE_BUS]</span> &gt; ${msg}`;
            coercionConsole.appendChild(row);
            coercionConsole.scrollTop = coercionConsole.scrollHeight;
        };

        // ========================================================
        // TEST 1: OPERATOR COERCION ("5" + 9 vs "5" - 9)
        // ========================================================
        runPlusTest.addEventListener('click', () => {
            logicLog("<span class='text-cyan-400'>Evaluating Operator: \"5\" + 9 </span>");
            let result = "5" + 9;
            logicLog(`V8 observed inverted quotes String. Switched Plus to Concatenation (Text Glue).`);
            logicLog(`Result in RAM Cell -> Value: <span class='text-cyan-400'>${result}</span> | Type: <span class='text-emerald-400'>${typeof result}</span>`);
        });

        runMinusTest.addEventListener('click', () => {
            logicLog("<span class='text-indigo-400'>Evaluating Operator: \"5\" - 9 </span>");
            let result = "5" - 9;
            logicLog(`V8 observed Mathematical Minus. Explicitly brute-forced String "5" into Primitive Number.`);
            logicLog(`Result in RAM Cell -> Value: <span class='text-cyan-400'>${result}</span> | Type: <span class='text-emerald-400'>${typeof result}</span>`);
        });

        // ========================================================
        // TEST 2: EQUALITY LOCKS (== vs ===)
        // ========================================================
        runLooseEquality.addEventListener('click', () => {
            logicLog("<span class='text-amber-400'>Evaluating Loose Equality Lock: (\"5\" == 5)</span>");
            if ("5" == 5) {
                logicLog("Status: <span class='text-emerald-400'>TRUE</span>. Lock opened. Coercion engine bypassed type lineage.");
            } else {
                logicLog("Status: FALSE.");
            }
        });

        runStrictEquality.addEventListener('click', () => {
            logicLog("<span class='text-orange-400'>Evaluating Strict Equality Lock: (\"5\" === 5)</span>");
            if ("5" === 5) {
                logicLog("Status: TRUE.");
            } else {
                logicLog("Status: <span class='text-rose-400'>FALSE</span>. Lock secure [b]! Rejected due to Type Lineage Mismatch (String vs Number) [b].");
            }
        });

        // ========================================================
        // TEST 3: SERVER DATA FALLBACKS (Plan B Protection)
        // ========================================================
        runFallbackTest.addEventListener('click', () => {
            logicLog("<span class='text-rose-400'>Simulating Network Fetch Completion...</span>");
            
            // Corrupted incoming payload from mock crashed server
            let incomingServerPayload = {
                username: null, // Critical missing field
                score: 0        // Valid numeric zero score state
            };

            logicLog("Raw Server Data Received -> username: null, score: 0");
            
            // Filtering empty fields using Nullish Coalescing (??) gate
            let safeUsername = incomingServerPayload.username ?? "Anonymous Guest";
            let safeScore = incomingServerPayload.score ?? 100; // Protection check

            logicLog(`Plan B Gate evaluation finalized.`);
            logicLog(`Output -> username: <span class='text-emerald-400'>"${safeUsername}"</span> (Fallback triggered)`);
            logicLog(`Output -> score: <span class='text-cyan-400'>${safeScore}</span> (Valid Zero preserved safely!)`);
        });
        // ================================================================
        // ////////////////////////////////////////////////////////////////
        // ================================================================
                const scopeConsole = document.getElementById('scopeConsole');
        const runBlockTest = document.getElementById('runBlockTest');
        const runScopeChainTest = document.getElementById('runScopeChainTest');

        const scopeLog = (msg) => {
            const row = document.createElement('div');
            row.innerHTML = `<span class="text-slate-600">[SCOPE_BUS]</span> &gt; ${msg}`;
            scopeConsole.appendChild(row);
            scopeConsole.scrollTop = scopeConsole.scrollHeight;
        };

        // ========================================================
        // GLOBAL SCOPE LAYER (فائل کا آخری کھلا میدان)
        // ========================================================
        let globalAsset = "Gold (Global)";

        // ========================================================
        // TEST 1: BLOCK SCOPE DEALLOCATION (بریکٹ تالا)
        // ========================================================
        runBlockTest.addEventListener('click', () => {
            scopeLog("<span class='text-cyan-400'>Initializing Block Scope Test...</span>");
            
            // Entering isolated bracket block
            if (true) {
                let bracketSecret = "MIT_ISOLATED_CELL";
                var leakedSecret = "VAR_LEAKED_CELL";
                scopeLog(`Inside brackets -> let 'bracketSecret' and var 'leakedSecret' are initialized.`);
            } 
            
            scopeLog("Exited brackets. V8 engine running deallocation routine...");

            // Checking var leakage (No bracket protection)
            scopeLog(`Checking var -> leakedSecret: <span class='text-rose-400'>${leakedSecret}</span> (Leaked! Memory Pollution)`);

            // Checking let protection (Enclosed inside bracket lock)
            try {
                // This will crash because bracketSecret was wiped from RAM on bracket exit
                eval('console.log(bracketSecret);');
            } catch (error) {
                scopeLog(`Checking let -> Result: <span class='text-emerald-400'>Secure!</span> RAM cell was destroyed.`);
                scopeLog(`<span class='text-rose-500 font-bold'>ENGINE EXCEPTION:</span> ${error.message}`);
            }
        });

        // ========================================================
        // TEST 2: SCOPE CHAIN SEARCH (ریورس ون-وے تلاشی)
        // ========================================================
        runScopeChainTest.addEventListener('click', () => {
            scopeLog("<span class='text-amber-400'>Starting Scope Chain Traversal...</span>");
            
            let parentAsset = "Silver (Parent)";

            // Child execution context nested inside parent
            function childExecutionRoutine() {
                let childAsset = "Bronze (Child)";
                
                scopeLog("--- CPU LOOKUP TIMELINE ---");
                
                // 1. Local Search
                scopeLog(`Searching 'childAsset' locally... Found: <span class='text-cyan-400'>${childAsset}</span>`);
                
                // 2. Parent Search via Outer Reference Pointer
                scopeLog("Searching 'parentAsset' locally... Missing. Extracting Outer Reference Pointer...");
                scopeLog(`Jumping to Parent Context... Found: <span class='text-amber-400'>${parentAsset}</span>`);
                
                // 3. Global Search via Root Pointer
                scopeLog("Searching 'globalAsset' locally... Missing. Travelling up the chain to Root...");
                scopeLog(`Jumping to Global Scope Field... Found: <span class='text-emerald-400'>${globalAsset}</span>`);
                
                // 4. Broken Chain Search (Crash Test)
                scopeLog("Searching 'nonExistentAsset' up to Global ceiling... Missing.");
                try {
                    eval('console.log(nonExistentAsset);');
                } catch(e) {
                    scopeLog(`<span class='text-rose-500 font-bold'>CHAIN TERMINATED:</span> ${e.message}`);
                    scopeLog("<span class='text-slate-500'>Conclusion: Reverse lookup failed safely. State protected.</span>");
                }
            }

            // Triggering the nested routing chain
            childExecutionRoutine();
        });
