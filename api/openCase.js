const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'No userId' });

    const { data: user, error: userError } = await supabase
        .from('users')
        .select('balance')
        .eq('id', userId)
        .single();

    if (userError || !user) return res.status(404).json({ error: 'User not found' });

    if (user.balance < 10) {
        return res.status(400).json({ error: 'Недостаточно монет!' });
    }

    const newBalance = user.balance - 10;
    
    const prizes = ['🚀 Ракета', '🌟 Звезда', '🧸 Мишка', '💎 Алмаз', '🍀 Клевер'];
    const wonItem = prizes[Math.floor(Math.random() * prizes.length)];

    const { error: updateError } = await supabase
        .from('users')
        .update({ balance: newBalance })
        .eq('id', userId);

    if (updateError) return res.status(500).json({ error: 'Database error' });

    res.status(200).json({ prize: wonItem, newBalance: newBalance });
};
