# PDForama
They say release early so here you are.

This is a proof-of-concept for integrating two awesome js libraries: [pdf.js](http://mozilla.github.io/pdf.js/) and [fotorama](http://fotorama.io). The result is an awesome interface for presentation viewing.

See [live example](http://kojoru.github.io/pdforama/examples/simple/).

Usage:

	<head>
  		<!-- jQuery -->
  		<script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>

		<!-- Fotorama -->
		<link href="fotorama.css" rel="stylesheet">
		<script src="fotorama.js"></script>

		<!-- pdf.js -->
		<script src="pdf.js"></script>

		<!-- pdforama -->
		<script src="pdforama.js"></script>
	</head>

	<body>

		<!-- Shoot -->
		<div class="pdforama" data-pdf="cors2.pdf"></div>

	</body>


Currently it only supports a default-sized fotorama window and is mostly unusable until the whole pdf is loaded. Told you it's only a proof of concept.

The plans are huge:

* Allow any width and height (absolute and relative)
* Previews
* Progressive loading
* npm/bower module
* Manual initialization and API
* Use fotorama native loading to show unloaded pages
* Make links and other active pdf content work
* Cleaner code and tests

Please let me know what features you would like to see in the issues section.