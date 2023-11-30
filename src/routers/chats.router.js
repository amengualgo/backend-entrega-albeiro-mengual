const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
    try
    {
        res.render('chat', {title:'WebChat'});
    }catch (e) {
        console.log('A ocurrido un error: ', e.message);
        return  res.status(500).json({message:e.message})
    }
});


module.exports = router;