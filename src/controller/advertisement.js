
const { Sequelize, Op, QueryTypes } = require("sequelize");
const db = require("../../models");
const Advertisement = db.Advertisement;

async function postAdv(req, res) {
  const { label, url } = req.body;
  let image = null;
  if (req.file != null) {
    image = req.file.path;
  }
  const data = await Advertisement.create(
    {
      label,
      url,
      image,
    } /*,{
    fields:['url']
  }*/
  );
  console.log(data.dataValues); //print the inserted values
}

function getAdv(req, res) {
  //findOne({})

  //Advertisement.findAll({})

  /*Advertisement.findAll({
    attributes:[
     // 'label'
     // 'url',
     // ['label','labels'] //Change attriute name as email to emailId,
     // [Sequelize.fn('COUNT',Sequelize.col('label')),'LabelCount'] //Count the number of emailid 
     // [Sequelize.fn('CONCAT',Sequelize.col('label'),'ID'),'emailCount'],
      exclude:['createdAt','updatedAt'],
      include:[
        [Sequelize.fn('CONCAT',Sequelize.col('label'),'ID'),'emailCount']
      ]
    ]
  })*/

  /*Advertisement.findAll({
    where:{
      /*id:2
     // id:{
        //[Op.eq]:5
     // },
    label:{
      [Op.like]:'rajat'
    }*/
  /*},
    order: [
      ['id', 'DESC'],
     
  ],

  limit:2,
  offset:1, //Skip the one record
    
  }) */
  Advertisement.count({})
    .then((result) => {
      return res.status(200).send({ result: result });
    })
    .catch((err) => {
      return res.status(200).send({ error: err });
    });
}

function updateAdv(req, res) {
  const _id = req.params.id;
  const { label, url } = req.body;
  const image = req.file.path;
  const a = Advertisement.update(
    {
      label,
      url,
      image,
    },
    { where: { id: _id } }
  );
  a.then((result) => {
    return res.status(200).send({ result: result });
  }).catch((err) => {
    return res.send(500).send({ error: err });
  });
}

function deleteAdv(req, res) {
  //Truncate Whole Table Data
  /* 
   Advertisement.destroy({
   truncate:true
  })*/

  Advertisement.destroy({
    where: { id: req.params.id },
  })
    .then((data) => {
      return res.status(200).send({
        message: "Advertisemet deleted successfully",
        adv: data,
      });
    })
    .catch((err) => {
      return res.send({ error: err });
    });
}

async function bulkAdd(req, res) {
  let x = await Advertisement.bulkCreate([
    { label: "rajat", url: "rajat@gmail.com" },
    { label: "abc", url: "abc@gmail.com" },
  ]);
  return res.send({
    data: x,
  });
}

async function finderData(req, res) {
  //const data=await Advertisement.findByPk(5)
  // const data=await Advertisement.findAndCountAll({
  /* where:{
    url:'rajat@gmail.com'
    }*/
  // })

  const [data, created] = await Advertisement.findOrCreate({
    where: { label: "dummy" },
    defaults: {
      url: "dummy@gmail.com",
      label: "qwerty",
    },
  });
  return res.json({ data: data, created: created });
}

async function seterFunction(req, res) {
  try {
    const { label, url } = req.body;
    const data = await Advertisement.create({
      label,
      url,
    });
    console.log(data);
  } catch (err) {
    const messages = {};
    err.error.forEach((result) => {
      let message;
      switch (result.validatorKey) {
        case "not_unique":
          message = "Duplicate Email";
          break;
      }
      messages[error.path] = message;
      console.log(messages);
    });
  }
}

async function rawQuery(){
  const users=await db.sequelize.query("select * from Advertisements",{
    type:QueryTypes.SELECT,
    model:Advertisement,
    mapToModel:true
  })

  return res.send(users);
}

module.exports = {
  postadv: postAdv,
  getadv: getAdv,
  updateadv: updateAdv,
  deleteadv: deleteAdv,
  bulkadd: bulkAdd,
  finderdata: finderData,
  setter: seterFunction,
  rawquery: rawQuery,
};
