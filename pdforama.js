'use strict';

$(function () {
    var fr, pdfPath;
    var $fotoramaDiv = $('.pdforama').fotorama({ data: [] });
    fr = $fotoramaDiv.data('fotorama');
    pdfPath = $fotoramaDiv.data('pdf');

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
                    var pageRendering = page.render(renderContext);
                    //Step : hook into the pdf render complete event
                    var completeCallback = pageRendering.internalRenderTask.callback;
                    pageRendering.internalRenderTask.callback = function (error) {
                        //Step 2: what you want to do before calling the complete method  
                        completeCallback.call(this, error);
                        //Step 3: do some more stuff
                        var page2 = canvas.toDataURL("image/png");
                        fr.push({ img: page2, data: { id: page.pageIndex} });
                        fr.sort(function (frameA, frameB) {
                            if (frameA.data.id > frameB.data.id) return 1;
                            if (frameA.data.id < frameB.data.id) return -1;
                            return 0;
                        });
                        console.log('page ' + (page.pageIndex + 1) + ' ready!');
                    };
                });
            }
        }


    });
});



