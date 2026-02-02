/**
 * Unified Import/Export Module
 * Provides consistent save/load/export functions for all pages.
 */

(function (window) {
    'use strict';

    var UnifiedIO = {

        /**
         * Save data to JSON file.
         * @param {Object} data - Data to save
         * @param {string} filename - Base filename (without extension)
         */
        saveJSON: function (data, filename) {
            var blob = new Blob([JSON.stringify(data, null, 2)], {
                type: 'application/json'
            });
            this._downloadBlob(blob, filename + '_' + this._datestamp() + '.json');
        },

        /**
         * Load JSON file via file picker.
         * @param {Function} callback - Called with (error, data)
         */
        loadJSON: function (callback) {
            var input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = function (e) {
                var file = e.target.files[0];
                if (!file) return;

                var reader = new FileReader();
                reader.onload = function (event) {
                    try {
                        var data = JSON.parse(event.target.result);
                        callback(null, data);
                    } catch (error) {
                        callback(error, null);
                    }
                };
                reader.readAsText(file);
            };
            input.click();
        },

        /**
         * Export Markdown string to file.
         * @param {string} markdown - Content
         * @param {string} filename - Base filename
         */
        exportMarkdown: function (markdown, filename) {
            var blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
            this._downloadBlob(blob, filename + '_' + this._datestamp() + '.md');
        },

        /**
         * Export to DOCX using docx.js.
         * @param {Object} docData - { title, date, sections: [{ title, content }] }
         * @param {string} filename - Base filename
         */
        exportDOCX: function (docData, filename) {
            if (typeof docx === 'undefined') {
                console.warn('[UnifiedIO] docx.js not loaded');
                alert('DOCX export requires the docx.js library.');
                return;
            }

            try {
                var paragraphs = [];

                // Title
                paragraphs.push(
                    new docx.Paragraph({
                        text: docData.title || 'Document',
                        heading: docx.HeadingLevel.HEADING_1
                    })
                );

                // Date
                if (docData.date) {
                    paragraphs.push(
                        new docx.Paragraph({
                            text: 'Date : ' + docData.date,
                            spacing: { after: 400 }
                        })
                    );
                }

                // Sections
                var sections = docData.sections || [];
                for (var i = 0; i < sections.length; i++) {
                    var sec = sections[i];
                    paragraphs.push(
                        new docx.Paragraph({
                            text: sec.title || '',
                            heading: docx.HeadingLevel.HEADING_2,
                            spacing: { before: 400, after: 200 }
                        })
                    );
                    if (sec.content) {
                        var contentLines = sec.content.split('\n');
                        for (var j = 0; j < contentLines.length; j++) {
                            paragraphs.push(
                                new docx.Paragraph({
                                    text: contentLines[j],
                                    spacing: { after: 100 }
                                })
                            );
                        }
                    }
                }

                var doc = new docx.Document({
                    sections: [{
                        properties: {},
                        children: paragraphs
                    }]
                });

                var self = this;
                docx.Packer.toBlob(doc).then(function (blob) {
                    self._downloadBlob(blob, filename + '_' + self._datestamp() + '.docx');
                });
            } catch (error) {
                console.error('[UnifiedIO] DOCX export error:', error);
                alert('Erreur lors de l\'export DOCX.');
            }
        },

        /**
         * Export to ODT (simplified flat XML).
         * @param {Object} docData - { title, date, sections: [{ title, content }] }
         * @param {string} filename - Base filename
         */
        exportODT: function (docData, filename) {
            var esc = this._escapeXML;
            var lines = [];

            lines.push('<?xml version="1.0" encoding="UTF-8"?>');
            lines.push('<office:document xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"');
            lines.push('  xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"');
            lines.push('  xmlns:style="urn:oasis:names:tc:opendocument:xmlns:style:1.0"');
            lines.push('  xmlns:fo="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0"');
            lines.push('  office:version="1.3" office:mimetype="application/vnd.oasis.opendocument.text">');

            // Automatic styles
            lines.push('<office:automatic-styles>');
            lines.push('  <style:style style:name="H1" style:family="paragraph">');
            lines.push('    <style:paragraph-properties fo:margin-bottom="0.5cm"/>');
            lines.push('    <style:text-properties fo:font-size="18pt" fo:font-weight="bold"/>');
            lines.push('  </style:style>');
            lines.push('  <style:style style:name="H2" style:family="paragraph">');
            lines.push('    <style:paragraph-properties fo:margin-top="0.5cm" fo:margin-bottom="0.3cm"/>');
            lines.push('    <style:text-properties fo:font-size="14pt" fo:font-weight="bold"/>');
            lines.push('  </style:style>');
            lines.push('</office:automatic-styles>');

            lines.push('<office:body>');
            lines.push('  <office:text>');

            // Title
            lines.push('    <text:p text:style-name="H1">' + esc(docData.title || 'Document') + '</text:p>');

            // Date
            if (docData.date) {
                lines.push('    <text:p>Date : ' + esc(docData.date) + '</text:p>');
            }

            // Sections
            var sections = docData.sections || [];
            for (var i = 0; i < sections.length; i++) {
                var sec = sections[i];
                lines.push('    <text:p text:style-name="H2">' + esc(sec.title || '') + '</text:p>');
                if (sec.content) {
                    var contentLines = sec.content.split('\n');
                    for (var j = 0; j < contentLines.length; j++) {
                        lines.push('    <text:p>' + esc(contentLines[j]) + '</text:p>');
                    }
                }
            }

            lines.push('  </office:text>');
            lines.push('</office:body>');
            lines.push('</office:document>');

            var xml = lines.join('\n');
            var blob = new Blob([xml], {
                type: 'application/vnd.oasis.opendocument.text'
            });
            this._downloadBlob(blob, filename + '_' + this._datestamp() + '.fodt');
        },

        // ---- Private helpers ----

        _downloadBlob: function (blob, filename) {
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        },

        _datestamp: function () {
            return new Date().toISOString().slice(0, 10);
        },

        _escapeXML: function (str) {
            if (!str) return '';
            return str
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&apos;');
        }
    };

    window.UnifiedIO = UnifiedIO;

})(window);
