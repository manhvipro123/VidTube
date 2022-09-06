import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/models/user.schema';
import { Video, VideoDocument } from 'src/models/video.schema';
import { UserService } from 'src/user/user.service';
import { isBuffer } from 'util';



@Injectable()
export class VideoService {
  constructor(
    private userService: UserService,

    @InjectModel('video', 'youtube-clone') private videoModel: Model<VideoDocument>,
    @InjectModel('user', 'youtube-clone') private userModel: Model<UserDocument>,
  ) { }

  async createVideoInfo(video: Video, user: any) {
    try {
      const newVideo = new this.videoModel(video);
      const user_Indb = await this.userModel.findOne({
        email: user.email,
      }).exec();
      newVideo.owner = user_Indb._id;
      const _video = await newVideo.save();
      // this.userModel.
      //   findByIdAndUpdate(
      //     user_Indb._id, { ...user_Indb, videoList: [...user_Indb.videoList, _video._id] }
      //   ).exec();
      return _video;
    } catch (err) {
      console.log(err);
    }
  }

  async findAllVideoInfo() {
    try {
      return await this.videoModel
        .find({ isHidden : false})
        .select('-url -likes -dislikes -description -comments')
        .populate('owner', '_id name photoUrl', this.userModel)
        .sort({ createdAt: -1 });;
    } catch (err) {
      console.log(err);
    }
  }

  async findAllVideoInfoExceptUser(user: any) {
    try {
      if (user) {
        const id = await this.userService.findOne(user.email);
        return this.videoModel
          .find({ owner: { $ne: Object(id) } })
          .select('-url -likes -dislikes -description -comments')
          .populate('owner', '_id name photoUrl', this.userModel)
          .sort({ createdAt: -1 });
      } else {
        return await this.findAllVideoInfo();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async findOneVideoInfo(_id: string) {
    try {
      return await this.videoModel
        .findOne({ _id: _id })
        .populate('owner', '_id name photoUrl subscriberList subscribers', this.userModel);
    } catch (err) {
      console.log(err);
    }
  }

  async findEntireVideoInfo(_id: string) {
    try {
      return await this.videoModel
        .find({ _id: { $nin: [Object(_id)] } })
        .select('-url -likes -dislikes -description -comments')
        .populate('owner', '_id name photoUrl', this.userModel)
        .sort({ createdAt: -1 });
    } catch (err) {
      console.log(err);
    }
  }

  async countView(_id: string) {
    try {
      const videoFind = await this.videoModel.findById(_id).exec();
      const videoViews = videoFind.views + 1;
      this.videoModel.findByIdAndUpdate(_id, { views: videoViews }).exec();
      return videoViews;
    } catch (err) {
      console.log(err);
    }
  }

  async likeVideo(_id: string, email: string) {
    try {

      const user = await this.userModel.findOne({
        email: email
      }).exec();
      const video = await this.videoModel.findOne({
        _id: _id
      }).exec();

      if (video.dislikeList.includes(user._id)) {
        let i = video.dislikeList.indexOf(user);
        video.dislikeList.splice(i, 1);
        video.dislikes = video.dislikes - 1;
      }

      // const likeList = [...video.likeList,user._id];
      video.likeList.push(user);
      video.likes = video.likes + 1;
      const newVid = await video.save();
      // this.videoModel.findByIdAndUpdate(video._id, { ...video, likeList: [...video.likeList, user._id] }).exec();
      return newVid;
    } catch (err) {
      console.log(err);
    }
  }

  async unlikeVideo(_id: string, email: string) {
    try {
      const user = await this.userModel.findOne({
        email: email
      }).exec();
      const video = await this.videoModel.findOne({
        _id: _id
      }).exec();

      if (video.likeList.includes(user._id)) {
        let i = video.likeList.indexOf(user);
        video.likeList.splice(i, 1);
        video.likes = video.likes - 1;
      }

      const newVid = await video.save();
      return newVid;
    } catch (err) {
      console.log(err);
    }
  }

  async dislikeVideo(_id: string, email: string) {
    try {
      // console.log(_id);
      const user = await this.userModel.findOne({
        email: email
      }).exec();
      const video = await this.videoModel.findOne({
        _id: _id
      }).exec();

      if (video.likeList.includes(user._id)) {
        let i = video.likeList.indexOf(user);
        video.likeList.splice(i, 1);
        video.likes = video.likes - 1;
      }

      video.dislikes = video.dislikes + 1;
      video.dislikeList.push(user);

      const newVid = await video.save();
      return newVid;
    } catch (err) {
      console.log(err);
    }
  }

  async undislikeVideo(_id: string, email: string) {
    try {

      const user = await this.userModel.findOne({
        email: email
      }).exec();
      const video = await this.videoModel.findOne({
        _id: _id
      }).exec();

      if (video.dislikeList.includes(user._id)) {
        let i = video.dislikeList.indexOf(user);
        video.dislikeList.splice(i, 1);
        video.dislikes = video.dislikes - 1;
      }

      // for(let i = 0; i < video.dislikeList.length; i++){
      //   // console.log(video.dislikeList[i].email)
      //   if(video.dislikeList[i].email == user.email){
      //     video.dislikeList.splice(i,1);
      //     video.dislikes = video.dislikes - 1;
      //     break;
      //   }
      // }

      const newVid = await video.save();
      return newVid;
    } catch (err) {
      console.log(err);
    }
  }
}
