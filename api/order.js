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

    const formData = new URLSearchParams();

    formData.append('key', API_KEY);
    formData.append('action', 'add');
    formData.append('service', SERVICE_ID);
    formData.append('link', link);
    formData.append('quantity', quantity);

    const response = await fetch('https://indosmm.id/api/v2', {

      method: 'POST',

      headers: {
        'Content-Type':
        'application/x-www-form-urlencoded'
      },

      body: formData

    });

    const data = await response.json();

    return res.status(200).json(data);

  } catch (err) {

    return res.status(500).json({
      error: err.message
    });

  }

}
