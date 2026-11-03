const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

module.exports = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'No userId' });

    const [userResponse, inventoryResponse] = await Promise.all([
        supabase.from('users').select('first_name, balance').eq('id', userId).single(),
        supabase.from('inventory').select('item_name').eq('user_id', userId).order('created_at', { ascending: false })
    ]);

    res.status(200).json({
        balance: userResponse.data?.balance || 0,
        inventory: inventoryResponse.data || []
    });
};
