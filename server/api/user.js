var express  = require('express');
var router   = express.Router();
const data = require('../dummy/userData');
// Index
router.post('/',
  function(req, res, next){
    const {page, size, ...filter} = req.body;
    // 검색 필드에 값이 있을 경우
    let newData = data.filter(function(item){
      return Object.keys(filter).every((key) => {
        return item[key] == filter[key]
      });
    });
    let sliced = newData.slice((size * (page - 1)), (size * page));
    res.json({
      msg: "ok", 
      data: { 
        dbdata: sliced, 
        page: 1,
        total: newData.length,
        size
      }
    });
  }
);

// Show
router.get('/:id',
  function(req, res, next){
    let user_id = req.params.id;
    let user = data.find(user => user.id == user_id);
    res.json({
      msg: "ok",
      data: {
        dbdata: user,
      }
    });
  }
);

// Create
router.post('/',
  function(req, res, next){
    // id 값 array 생성 후 최대값 가져와 값 부여하기
    let result = data.map( a => a.id),
        max = Math.max(...result);
    // 신규 배열 생성하기
    let user = {
      'id': max+1,
      'name': req.query.name, 
      'phone': req.query.phone,
      'gender': req.query.gender,
      'age': req.query.age,
      'blood_type': req.query.blood_type,
    };
    data.unshift(user);
    res.json({
      msg: "ok", 
      data: { 
        dbdata: user,
      }
    });
  }
);

// Update
router.post('/:id',
  function(req, res, next){
    let user = {
      'id': req.params.id,
      'name': req.query.name, 
      'phone': req.query.phone,
      'gender': req.query.gender,
      'age': req.query.age,
      'blood_type': req.query.blood_type
    }
    res.json({
      msg: "ok", 
      data: { 
        dbdata: user,
      }
    });
  }
);

// Destroy
router.post('/:id',
  function(req, res, next){
    let user_id = req.params.id;
    let index = data.findIndex(user => user.id === user_id);
    data.splice(index, 1);
    res.json({
      msg: "ok"
    });
  }
);

module.exports = router;