export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed'
    });
  }

  try {

    const API_KEY = process.env.SMM_API_KEY;
    const SERVICE_ID = process.env.SERVICE_ID;

    const { link, quantity } = req.body;

    if (!link || !quantity) {

      return res.status(400).json({
        error: 'Data tidak lengkap'
      });

    }

    const formData = new URLSearchParams();

    formData.append('key', API_KEY);
    formData.append('action', 'add');
    formData.append('service', SERVICE_ID);
    formData.append('link', link);
    formData.append('quantity', quantity);

    const response = await fetch('https://indosmm.id/api', {

      method: 'POST',

      headers: {
        'Content-Type':
        'application/x-www-form-urlencoded'
      },

      body: formData

    });

    const text = await response.text();

    return res.status(200).send(text);

  } catch (err) {

    return res.status(500).json({
      error: err.message
    });

  }

}
