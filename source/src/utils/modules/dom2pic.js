
import { promiseObj } from '@/utils/index';
import FileSaver from 'file-saver';
import html2canvas from 'html2canvas';
import JSZip from 'jszip';

export const downloadItems = (items, zipName = '下载') => (
  new Promise(resolve => {
    const zip = new JSZip()
    const fileFolder = zip.folder(zipName);

    promiseObj(Array.from(items).reduce((total, current) => ({
      ...total,
      [current.getAttribute('data-name')]: html2canvas(current)
    }), {})).then(res => {
      const arr = Object.keys(res).map((key) => ({
        name: key,
        base64: res[key].toDataURL('image/png', 1).substring(22)
      }));

      arr.forEach(({ name, base64 }) => {
        fileFolder.file(name + '.png', base64, {
          base64: true
        })
      })

      zip.generateAsync({ type: 'blob' }).then(content => {
        FileSaver.saveAs(content, zipName + '.zip')
        resolve();
      })
    })
  })
)
