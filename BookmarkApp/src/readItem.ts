import { BrowserWindow } from 'electron';

export default function readItem(url: string, callback: (data: { title: string; screenshot: string; url: string }) => void) {
    let offscreenWindow = new BrowserWindow({
        width: 500,
        height: 500,
        show: false,
        webPreferences: {
            offscreen: true,
            contextIsolation: false, // غیرفعال کردن جداسازی کانتکست
            nodeIntegration: true,   // فعال‌سازی Node.js در WebContents (در صورت نیاز)
        },
    });

    // بارگذاری URL
    offscreenWindow.loadURL(url);

    // وقتی صفحه بارگذاری کامل شد
    offscreenWindow.webContents.on('did-finish-load', async () => {
        try {
            // دریافت عنوان صفحه
            const title = offscreenWindow.getTitle();

            // گرفتن اسکرین‌شات
            const image = await offscreenWindow.webContents.capturePage();
            const screenshot = image.toDataURL();

            // فراخوانی callback با داده‌ها
            callback({
                title,
                screenshot,
                url,
            });
        } catch (error) {
            console.error('Error capturing page:', error);
            callback({
                title: 'Error',
                screenshot: '',
                url,
            });
        } finally {
            // بستن و آزادسازی پنجره
            if (offscreenWindow) {
                offscreenWindow.close();
                offscreenWindow = null;
            }
        }
    });

    // مدیریت خطاها
    offscreenWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
        console.error(`Failed to load URL: ${url}, Error: ${errorDescription} (${errorCode})`);
        callback({
            title: 'Failed to load',
            screenshot: '',
            url,
        });

        if (offscreenWindow) {
            offscreenWindow.close();
            offscreenWindow = null;
        }
    });
}
