import { model,Schema } from "mongoose";
const courseSchema = new Schema({
    title:{
        type:String,
        require:[true,'title is required'],
        minLength:[5,'title should be atleast 5 character'],
        maxLength:[60,'title should be less than 60 character'],
        trim:true
    },
    description:{
        type:String,
        require:[true,'description is required'],
        minLength:[8,'description should be atleast 8 character'],
        maxLength:[200,'description should be less than 200 character']
    },
   category:{
        type:String,
        require:[true,'category is required'],
    },
    thumbnail:{
        public_id:{
          type:String,
          require:true
        },
        secure_url:{
          type:String,
          require:true
        }
    },
    lectures:[
        {
            title:String,
            description:String,
            lecture:{
              public_id:{
                type:String,
                require:true
                },
              secure_url:{
                    type:String,
                    require:true
                }
            }
        }
    ],
    numberOfLectures:{
        type:Number,
        default:0
    },
    createdBy:{
        type:String,
        require:true
    },

},{
    timestamps:true
})

const Course =model('Course',courseSchema)

export default Course