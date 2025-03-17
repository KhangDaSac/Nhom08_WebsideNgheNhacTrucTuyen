const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    let token;

    // Kiểm tra token trong headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Kiểm tra token có tồn tại không
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Không có quyền truy cập'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Token không hợp lệ'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};

// Kiểm tra quyền admin
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Không có quyền thực hiện hành động này'
      });
    }
    next();
  };
}; 