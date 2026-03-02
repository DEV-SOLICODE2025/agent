const express = require('express');
const app = express();
app.use(express.json());
app.get('/api/health', (req,res)=>res.json({ok:true}));
app.get('/api/vitedemo', (req,res)=>res.json({data:[] }));
const port = process.env.PORT || 4000;
app.listen(port, ()=>console.log('Backend running on', port));
