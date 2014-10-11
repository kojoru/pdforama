'use strict';

$(function () {
    var fr, pdfPath, pages = [], currentPage = 0;
    var $fotoramaDiv = $('.pdforama').fotorama({ data: [] });
    fr = $fotoramaDiv.data('fotorama');
    pdfPath = $fotoramaDiv.data('pdf');

    var addPages = function () {
        while (pages[currentPage + 1] !== undefined) {
            fr.push({ img: pages[currentPage + 1], data: { id: currentPage + 1} });
            currentPage++;
        }
    }

    PDFJS.getDocument(pdfPath).then(function (pdf) {
        if (pdf.numPages >= 1) {
            for (var i = 1; i <= pdf.numPages; i++) {
                console.log('page ' + i);
                pdf.getPage(i).then(function (page) {
                    var vp1 = page.getViewport(1);

                    var scale = 500 / vp1.height;
                    var viewport = page.getViewport(scale);

                    //
                    // Prepare canvas using PDF page dimensions
                    //
                    var canvas = document.createElement('canvas');
                    var context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    //
                    // Render PDF page into canvas context
                    //
                    var renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };
                    var pageRendering = page.render(renderContext).then(function(){
                        var dataURL = canvas.toDataURL("image/png");
                        pages[page.pageIndex] = dataURL;
                        addPages();
                        console.log('page ' + (page.pageIndex + 1) + ' ready!');
                    });
                });
            }
        }


    });
});



