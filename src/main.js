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