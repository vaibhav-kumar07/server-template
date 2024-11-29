import multer from 'multer';
import path from 'path';
import fs from 'fs';
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../multer'));
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

export const upload = multer({ storage: storage });

export const deleteFile = async (filePath: string) => {
	fs.unlink(filePath, (err) => {
		if (err) {
			console.error('Failed to delete the file:', err);
			return;
		}
		console.log('File successfully deleted');
	});
};
