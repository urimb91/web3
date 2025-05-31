require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/approve', async (req, res) => {
  const { paymentId } = req.body;

  try {
    const result = await axios.get(`https://api.minepi.com/v2/payments/${paymentId}`, {
      headers: {
        Authorization: `Key ${process.env.PI_API_KEY}`
      }
    });

    if (result.data.status === 'pending') {
      res.sendStatus(200); // Approve
    } else {
      res.status(400).send('Not valid');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
});

app.listen(3000, () => {
  console.log('Backend running on port 3000');
});

