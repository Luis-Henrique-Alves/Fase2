const router = require('express').Router();


router.get('/', (req,res)=>{

    res.json({
        mensagem:
        'API funcionando'
    });

});


module.exports = router;