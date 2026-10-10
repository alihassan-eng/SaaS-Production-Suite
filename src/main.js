  // ==========================================
        // 1. MEMORY BLUEPRINT & APPLICATION STATE
        // ==========================================
        // These variables are locked in Block Scope inside this script block.
        // Stack allocated references pointing to local states.
        let accountBalance = 1000; 

        // DOM Element References (Stack allocated pointer keys to Heap objects)
        const balanceDisplay = document.getElementById('balanceDisplay');
        const amountInput = document.getElementById('amountInput');
        const depositBtn = document.getElementById('depositBtn');
        const withdrawBtn = document.getElementById('withdrawBtn');
        const logConsole = document.getElementById('logConsole');

        // ==========================================
        // 2. PURE FUNCTIONS (Zero Side-Effects)
        // ==========================================
        // CPU Cache Friendly (Deterministic: Same Input = Same Output)
        // These routines manipulate raw numbers inside Stack memory registers.
        const pureDeposit = (currentBalance, amount) => currentBalance + amount;
        const pureWithdraw = (currentBalance, amount) => currentBalance - amount;

        // ==========================================
        // 3. HARDWARE LOGGING SYSTEM (Side-Effect Box)
        // ==========================================
        const appendHardwareLog = (message) => {
            const time = new Date().toLocaleTimeString();
            const logRow = document.createElement('div');
            logRow.innerHTML = `<span class="text-slate-500">[${time}]</span> <span class="text-emerald-500">&gt;</span> ${message}`;
            logConsole.appendChild(logRow);
            logConsole.scrollTop = logConsole.scrollHeight; // Auto-scroll
        };

        // ==========================================
        // 4. TRANSACTION CONTROLLER (Control Flow)
        // ==========================================
        const processTransaction = (type) => {
            // Nullish Coalescing (??) Protection Layer
            // Forces raw string parsing with explicit coercion safety
            const rawValue = amountInput.value === "" ? null : amountInput.value;
            const finalizedInput = rawValue ?? "0"; // Plan B fallback

            // Strict Coercion Validation (Explicitly casting String to Primitive Number)
            const numericAmount = Number(finalizedInput);

            // Guard Clauses (Strict Equality Filters)
            if (isNaN(numericAmount) || numericAmount <= 0) {
                appendHardwareLog(`<span class="text-rose-400">Reference rejected. Invalid atomic charge data.</span>`);
                return;
            }

            // Stateful Evaluation Block
            if (type === 'DEPOSIT') {
                // Invoking pure mathematical pipeline
                accountBalance = pureDeposit(accountBalance, numericAmount);
                appendHardwareLog(`RAM Mutated. Cell address populated with new register value: $${accountBalance}`);
            } else if (type === 'WITHDRAW') {
                if (numericAmount > accountBalance) {
                    appendHardwareLog(`<span class="text-amber-400">Transaction Blocked. Insufficient electronic funds in local balance cell.</span>`);
                    return;
                }
                accountBalance = pureWithdraw(accountBalance, numericAmount);
                appendHardwareLog(`RAM Mutated. Cell address populated with new register value: $${accountBalance}`);
            }

            // Single-Threaded UI Thread Sync (DOM Repaint via Blink Engine)
            balanceDisplay.textContent = accountBalance;
            amountInput.value = ''; // Flush input memory cell
        };

        // ==========================================
        // 5. EVENT DRIVEN TRIGGERS (Call Stack Pushes)
        // ==========================================
        // When clicked, browser Web APIs push these contexts onto the Call Stack.
        depositBtn.addEventListener('click', () => {
            appendHardwareLog(`<span class="text-cyan-400">Call Stack PUSH: depositBtn_OnClick() Context Active.</span>`);
            processTransaction('DEPOSIT');
            appendHardwareLog(`<span class="text-slate-500">Call Stack POP: depositBtn_OnClick() Context Deallocated.</span>`);
        });

        withdrawBtn.addEventListener('click', () => {
            appendHardwareLog(`<span class="text-cyan-400">Call Stack PUSH: withdrawBtn_OnClick() Context Active.</span>`);
            processTransaction('WITHDRAW');
            appendHardwareLog(`<span class="text-slate-500">Call Stack POP: withdrawBtn_OnClick() Context Deallocated.</span>`);
        });