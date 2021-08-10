const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Build template
  // 3) Render that template using tour data from step 1)

  res
    .status(200)
    // .set(
    //   'Content-Security-Policy',
    //   "connect-src 'self' https://cdnjs.cloudflare.com"
    // )
    .render('overview', {
      title: 'All Tours',
      tours,
    });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)

  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    select: 'review rating user',
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }
  // 2) Build template
  // 3) Render template using data from step 1)
  res
    .status(200)
    // .set(
    //   'Content-Security-Policy',
    //   // 'connect-src https://*.tiles.mapbox.com https://api.mapbox.com https://events.mapbox.com'
    //   "default-src 'self' https://*.mapbox.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://api.mapbox.com 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    // )
    // .set(
    //   'Content-Security-Policy',
    //   "connect-src 'self' https://cdnjs.cloudflare.com"
    // )
    .render('tour', {
      title: `${tour.name} Tour`,
      tour,
    });
});

exports.getLoginForm = (req, res) => {
  if (!res.locals.user) {
    res
      .status(200)
      // .set(
      //   'Content-Security-Policy',
      //   "connect-src 'self' https://cdnjs.cloudflare.com"
      // )
      .render('login', {
        title: 'Log into your account',
      });
  } else {
    res.redirect('/');
  }
};
exports.getSignupForm = (req, res) => {
  if (!res.locals.user) {
    res.status(200).render('register', {
      title: 'Create your account',
    });
  } else {
    res.redirect('/');
  }
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // 2) Find tours with the returned IDs
  const tourIDs = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });
  // Select all the tours which have an _id in the tourIDs array

  res.status(200).render('overview', {
    title: 'My Tours',
    tours,
  });
  // Alternative, to above what we did can use Virtual Populate
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      // req.body.name because we gave the html input field the name attribute
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser,
  });
});

exports.forgotPassword = (req, res) => {
  res.status(200).render('forgotPassword', {
    title: 'Reset your password',
  });
};

exports.resetPassword = (req, res) => {
  if (!res.locals.user) {
    const { token } = req.params;
    res.status(200).render('resetPassword', {
      title: 'Reset your password',
      token,
    });
  } else {
    res.redirect('/');
  }
};
