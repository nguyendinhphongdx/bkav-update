const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema({
   version_name: {
       type: String,
       required: true,
       min:3
   },
   type_file:{
       type: String,
       required: true,
    },
    total_size:{type: Number},
    description:{type: String}
},{ timestamps:true });


module.exports = mongoose.model('Version',versionSchema);