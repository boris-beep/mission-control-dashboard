// Real data integration for ops sections

// Fetch bot health from sessions API
async function loadBotHealthReal() {
    try {
        // In production, this would call the OpenClaw sessions API
        // For now, using the data we have from recent sessions_list call
        const sessions = [
            { key: 'agent:main:main', displayName: 'Boris (Main)', updatedAt: Date.now(), totalTokens: 49552, model: 'claude-sonnet-4-5' },
            { key: 'agent:archie:main', displayName: 'Archie (Scout)', updatedAt: Date.now() - (3 * 60 * 60 * 1000), totalTokens: 28059, model: 'claude-sonnet-4-5' },
            { key: 'agent:penny:main', displayName: 'Penny (PA)', updatedAt: Date.now() - (9 * 60 * 60 * 1000), totalTokens: 220952, model: 'kimi-k2.5' }
        ];

        const bots = sessions.map(session => {
            const now = Date.now();
            const diff = now - session.updatedAt;
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor(diff / (1000 * 60));
            
            let status = 'active';
            let lastActivity = 'Just now';
            
            if (hours > 6) {
                status = 'inactive';
                lastActivity = `${hours}h ago`;
            } else if (hours > 0) {
                status = 'idle';
                lastActivity = `${hours}h ago`;
            } else if (minutes > 5) {
                status = 'idle';
                lastActivity = `${minutes}m ago`;
            }

            return {
                name: session.displayName.split(' ')[0],
                role: session.displayName.includes('Main') ? 'CEO / Master Controller' : 
                      session.displayName.includes('Scout') ? 'Knowledge Scout' : 'Personal Assistant',
                status,
                lastActivity,
                tokensUsed: `${Math.floor(session.totalTokens / 1000)}K`,
                model: session.model
            };
        });

        const botList = document.getElementById('bot-list');
        document.getElementById('bot-count').textContent = bots.length;

        botList.innerHTML = bots.map(bot => `
            <div class="bot-item">
                <div class="bot-info">
                    <div class="bot-status-dot ${bot.status}"></div>
                    <div>
                        <div class="bot-name">${bot.name}</div>
                        <div class="bot-role">${bot.role}</div>
                    </div>
                </div>
                <div class="bot-meta">
                    <span>Last: ${bot.lastActivity}</span>
                    <span>${bot.tokensUsed} tokens</span>
                    <span style="font-size: 0.75rem; opacity: 0.6">${bot.model}</span>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Failed to load bot health:', error);
    }
}

// Fetch cron jobs from cron API data
async function loadCronJobsReal() {
    try {
        // Read cron data (this should be exposed via API endpoint in production)
        const cronJobs = [
            { name: 'Daily Skill Discovery', expr: '0 4 * * *', next: getNextCronTime('0 4 * * *') },
            { name: 'Sunday Skill Review', expr: '0 8 * * 0', next: getNextCronTime('0 8 * * 0') },
            { name: 'Weekly Bot Reports', expr: '0 20 * * 0', next: getNextCronTime('0 20 * * 0') },
            { name: 'Sunday Discussions (6)', type: 'at', next: 'Today 12:00-15:30' },
            { name: 'Birthday Reminders (15)', type: 'scheduled', next: 'Various dates' }
        ];

        const cronList = document.getElementById('cron-list');
        document.getElementById('cron-count').textContent = '23'; // Total from actual cron list

        cronList.innerHTML = cronJobs.map(cron => `
            <div class="cron-item">
                <div class="cron-info">
                    <div class="cron-name">${cron.name}</div>
                    <div class="cron-schedule">${cron.expr || cron.type}</div>
                </div>
                <div class="cron-next">${cron.next}</div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Failed to load cron jobs:', error);
    }
}

// Calculate next cron time (simplified)
function getNextCronTime(expr) {
    // Parse cron expression: minute hour day month dayOfWeek
    const [min, hour, day, month, dow] = expr.split(' ');
    const now = new Date();
    
    if (dow === '0') {
        // Weekly on Sunday
        const daysUntilSunday = (7 - now.getDay()) % 7;
        if (daysUntilSunday === 0 && now.getHours() < parseInt(hour)) {
            return 'Today ' + hour + ':' + min.padStart(2, '0');
        } else if (daysUntilSunday === 0) {
            return 'Next Sunday ' + hour + ':' + min.padStart(2, '0');
        } else {
            return `In ${daysUntilSunday} days`;
        }
    } else if (dow === '*') {
        // Daily
        if (now.getHours() < parseInt(hour)) {
            return 'Today ' + hour + ':' + min.padStart(2, '0');
        } else {
            return 'Tomorrow ' + hour + ':' + min.padStart(2, '0');
        }
    }
    
    return 'Soon';
}

