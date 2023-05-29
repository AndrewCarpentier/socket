const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
	app.use(
		"/api/*",
		createProxyMiddleware({
			target: "http://172.24.208.1:8000",
			secure: false,
		})
	);
};