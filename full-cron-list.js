// Full cron job list with all 23 jobs
async function loadFullCronJobs() {
    const cronJobs = [
        // RECURRING TASKS
        { 
            category: 'Recurring',
            name: 'Daily Skill Discovery', 
            schedule: 'Every day @ 4:00 AM CST', 
            next: 'Tomorrow 4:00 AM',
            agent: 'main',
            type: 'isolated'
        },
        { 
            category: 'Recurring',
            name: 'Sunday Skill & Cron Review', 
            schedule: 'Every Sunday @ 8:00 AM CST', 
            next: 'Next Sunday 8:00 AM',
            agent: 'main',
            type: 'main'
        },
        { 
            category: 'Recurring',
            name: 'Weekly Bot Report Collection', 
            schedule: 'Every Sunday @ 8:00 PM CST', 
            next: 'Today 8:00 PM',
            agent: 'main',
            type: 'main'
        },
        { 
            category: 'Recurring',
            name: '48-Hour Autonomous Test', 
            schedule: 'Feb 9 @ 9:00 AM (one-time)', 
            next: 'Next Sunday 9:00 AM',
            agent: 'main',
            type: 'main'
        },
        { 
            category: 'Recurring',
            name: 'Co-Writer Placement Review', 
            schedule: 'Feb 9 @ 10:00 AM (one-time)', 
            next: 'Next Sunday 10:00 AM',
            agent: 'main',
            type: 'main'
        },
        { 
            category: 'Recurring',
            name: 'Songwriter Database Review', 
            schedule: 'Feb 9 @ 11:00 AM (one-time)', 
            next: 'Next Sunday 11:00 AM',
            agent: 'main',
            type: 'main'
        },
        
        // SUNDAY DISCUSSIONS
        { 
            category: 'Sunday Discussions',
            name: '#4: YouTube AI Music Channel', 
            schedule: 'Today @ 12:00 PM', 
            next: 'Today 12:00 PM',
            agent: 'main',
            type: 'systemEvent'
        },
        { 
            category: 'Sunday Discussions',
            name: '#5: Website Building Business', 
            schedule: 'Today @ 1:00 PM', 
            next: 'Today 1:00 PM',
            agent: 'main',
            type: 'systemEvent'
        },
        { 
            category: 'Sunday Discussions',
            name: '#6: AI Content Video Review', 
            schedule: 'Today @ 2:00 PM', 
            next: 'Today 2:00 PM',
            agent: 'main',
            type: 'systemEvent'
        },
        { 
            category: 'Sunday Discussions',
            name: '#7: Master Project Ideas', 
            schedule: 'Today @ 3:00 PM', 
            next: 'Today 3:00 PM',
            agent: 'main',
            type: 'systemEvent'
        },
        { 
            category: 'Sunday Discussions',
            name: '#8: Operation Piggy Bank', 
            schedule: 'Today @ 3:30 PM', 
            next: 'Today 3:30 PM',
            agent: 'main',
            type: 'systemEvent'
        },
        
        // BIRTHDAY REMINDERS
        { 
            category: 'Birthday Reminders',
            name: 'Jacob Plant (client)', 
            schedule: 'Feb 16, 2026', 
            next: 'In 7 days',
            agent: 'penny',
            type: 'agentTurn'
        },
        { 
            category: 'Birthday Reminders',
            name: 'Freddie Lloyd', 
            schedule: 'Feb 23, 2026', 
            next: 'In 14 days',
            agent: 'penny',
            type: 'agentTurn'
        },
        { 
            category: 'Birthday Reminders',
            name: 'Ashley Fitelson', 
            schedule: 'Apr 2, 2026', 
            next: 'In 52 days',
            agent: 'penny',
            type: 'agentTurn'
        },
        { 
            category: 'Birthday Reminders',
            name: 'Jeff Hartford', 
            schedule: 'Apr 16, 2026', 
            next: 'In 66 days',
            agent: 'penny',
            type: 'agentTurn'
        },
        { 
            category: 'Birthday Reminders',
            name: 'Sophia Wardman', 
            schedule: 'Apr 22, 2026', 
            next: 'In 72 days',
            agent: 'penny',
            type: 'agentTurn'
        },
        { 
            category: 'Birthday Reminders',
            name: 'Presley Nardella (33rd) - 2wk notice', 
            schedule: 'Apr 9, 2026 (2wk notice)', 
            next: 'In 59 days',
            agent: 'penny',
            type: 'agentTurn'
        },
        { 
            category: 'Birthday Reminders',
            name: 'Presley Nardella (33rd)', 
            schedule: 'Apr 23, 2026', 
            next: 'In 73 days',
            agent: 'penny',
            type: 'agentTurn'
        },
        { 
            category: 'Birthday Reminders',
            name: 'Jon & Jill Gray (brother + mother)', 
            schedule: 'Oct 8, 2026', 
            next: 'In 241 days',
            agent: 'penny',
            type: 'agentTurn'
        },
        { 
            category: 'Birthday Reminders',
            name: 'Annaca & Matt (dual birthday)', 
            schedule: 'Oct 18, 2026', 
            next: 'In 251 days',
            agent: 'penny',
            type: 'agentTurn'
        },
        { 
            category: 'Birthday Reminders',
            name: 'Jeff Gray (father)', 
            schedule: 'Nov 12, 2026', 
            next: 'In 276 days',
            agent: 'penny',
            type: 'agentTurn'
        },
        { 
            category: 'Birthday Reminders',
            name: 'Ellie Gray (niece)', 
            schedule: 'Dec 7, 2026', 
            next: 'In 301 days',
            agent: 'penny',
            type: 'agentTurn'
        },
        { 
            category: 'Birthday Reminders',
            name: 'Neil Gray (brother)', 
            schedule: 'Dec 22, 2026', 
            next: 'In 316 days',
            agent: 'penny',
            type: 'agentTurn'
        }
    ];

    // Group by category
    const grouped = {};
    cronJobs.forEach(job => {
        if (!grouped[job.category]) grouped[job.category] = [];
        grouped[job.category].push(job);
    });

    const cronList = document.getElementById('cron-list');
    document.getElementById('cron-count').textContent = cronJobs.length;

    let html = '';
    
    // Render each category
    Object.keys(grouped).forEach(category => {
        html += `
            <div class="cron-category">
                <div class="cron-category-title">${category} (${grouped[category].length})</div>
                ${grouped[category].map(job => `
                    <div class="cron-item">
                        <div class="cron-info">
                            <div class="cron-name">${job.name}</div>
                            <div class="cron-schedule">
                                <span>${job.schedule}</span>
                                <span class="cron-agent">${job.agent}</span>
                            </div>
                        </div>
                        <div class="cron-next">${job.next}</div>
                    </div>
                `).join('')}
            </div>
        `;
    });

    cronList.innerHTML = html;
}

// Add CSS for categories
const style = document.createElement('style');
style.textContent = `
.cron-category {
    margin-bottom: 1.5rem;
}

.cron-category-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--accent-blue);
    margin-bottom: 0.75rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border);
}

.cron-agent {
    display: inline-block;
    margin-left: 0.75rem;
    padding: 0.125rem 0.5rem;
    background: rgba(59, 130, 246, 0.1);
    color: var(--accent-blue);
    border-radius: 4px;
    font-size: 0.7rem;
    font-weight: 500;
}

.cron-item {
    margin-bottom: 0.5rem;
}
`;
document.head.appendChild(style);
