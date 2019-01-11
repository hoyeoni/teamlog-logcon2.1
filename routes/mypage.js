const express = require('express');
const db = require('../db/connection');
const router = express.Router();

router.get('/',(req,res) => {
    if((req.session.user === undefined)){
        res.redirect('/');
    }
    else{
        if(!(req.session.flag))
            res.redirect('/auth');
        else{
            db.query('select * from Users where ID = ?', req.session.user, (err,result) => {
                if (err) throw err;
                res.render('mypage.ejs',{
                    user_id : result[0].ID,
                    user_school : result[0].SCHOOL,
                    score : result[0].SCORE,
                    comment : result[0].PROFILE_COMMENT
                })
            })
        }
    }
})

router.post('/',(req,res) => {
    const ment = req.body.ment;
    const user = req.session.user;
    db.query('update Users set PROFILE_COMMENT=? where ID = ?',[ment,user]);
    res.send('<script type="text/javascript">alert("수정완료!ヽ(๑╹◡╹๑)ノ");window.location.href = "mypage";</script>');
    console.log('코멘트 변경' + user);
})

module.exports = router;
