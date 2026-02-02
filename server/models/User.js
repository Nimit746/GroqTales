const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email address'],
    },
    password: { type: String, required: true, select: false },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    phone: { type: String, default: null },
    walletAddress: { type: String, default: null },
    role: {
      type: String,
      enum: ['user', 'admin', 'moderator'],
      default: 'user',
    },
    //Notifications
    notificationSettings: {
      email: {
        comments: {type: Boolean, default: true},
        likes: {type: Boolean, default: true},
        followers: {type: Boolean, default: true} ,
        nftSales: {type: Boolean, default: true} ,
        platform: {type: Boolean, default: false} ,
      },
      inApp: {
        comments: {type: Boolean, default: true},
        likes: {type: Boolean, default: true},
        followers: {type: Boolean, default: true} ,
        messages: {type: Boolean, default: true} ,
      },
    },
    // Wallet
    wallet: {
      address:{type: String},
      network: {type: String},
      provider: {type: String},
      verified: {type: Boolean, default: false},
      lastConnectedAt: {type: Date},
    },
    //privacy settings
    privacySettings: {
      profilePublic: {type: Boolean, default: true},
      allowComments: {type: Boolean, default: true},
      showActivity: {type: Boolean, default: true},
      showReadingHistory: {type: Boolean, default: false},
      dataCollection: {type: Boolean, default: true},
      personalization: {type: Boolean, default: true},
    },
    role : {
      type: String,
      enum: ['user', 'admin', 'moderator'],
      default: 'user',
    }
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10); // bcrypt rounds = 10
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
