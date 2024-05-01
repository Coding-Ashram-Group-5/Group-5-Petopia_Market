import mongoose from 'mongoose';

interface IComment {
  comment: String;
}

type ICommentModel = mongoose.Model<IComment>;

const commentSchema: mongoose.Schema<IComment> = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, 'Comment Content is Required'],
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const commentModel: ICommentModel = mongoose.models.Comment || mongoose.model('Comment', commentSchema);

export default commentModel;
