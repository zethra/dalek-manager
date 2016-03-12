/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2012, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

/* This file was autogenerated from https://raw.github.com/dbp/sublime-rust/master/Rust.tmLanguage (uuid: ) */

define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var stringEscape = /\\(?:[nrt0'"]|x[\da-fA-F]{2}|u\{[\da-fA-F]{6}\})/.source;
var RustHighlightRules = function() {
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = { start:
       [ { token: 'variable.other.source.rust',
           // `(?![\\\'])` to keep a lifetime name highlighting from continuing one character
           // past the name. The end `\'` will block this from matching for a character like
           // `'a'` (it should have character highlighting, not variable highlighting).
           regex: '\'[a-zA-Z_][a-zA-Z0-9_]*(?![\\\'])' },
         { token: 'string.quoted.single.source.rust',
           regex: "'(?:[^'\\\\]|" + stringEscape + ")'" },
         {
            stateName: "bracketedComment",
            onMatch : function(value, currentState, stack){
                stack.unshift(this.next, value.length - 1, currentState);
                return "string.quoted.raw.source.rust";
            },
            regex : /r#*"/,
            next  : [
                {
                    onMatch : function(value, currentState, stack) {
                        var token = "string.quoted.raw.source.rust";
                        if (value.length >= stack[1]) {
                            if (value.length > stack[1])
                                token = "invalid";
                            stack.shift();
                            stack.shift();
                            this.next = stack.shift();
                        } else {
                            this.next = "";
                        }
                        return token;
                    },
                    regex : /"#*/,
                    next  : "start"
                }, {
                    defaultToken : "string.quoted.raw.source.rust"
                }
            ]
         },
         { token: 'string.quoted.double.source.rust',
           regex: '"',
           push: 
            [ { token: 'string.quoted.double.source.rust',
                regex: '"',
                next: 'pop' },
              { token: 'constant.character.escape.source.rust',
                regex: stringEscape },
              { defaultToken: 'string.quoted.double.source.rust' } ] },
         { token: [ 'keyword.source.rust', 'text', 'entity.name.function.source.rust' ],
           regex: '\\b(fn)(\\s+)([a-zA-Z_][a-zA-Z0-9_]*)' },
         { token: 'support.constant', regex: '\\b[a-zA-Z_][\\w\\d]*::' },
         { token: 'keyword.source.rust',
           regex: '\\b(?:abstract|alignof|as|box|break|continue|const|crate|do|else|enum|extern|for|final|if|impl|in|let|loop|macro|match|mod|move|mut|offsetof|override|priv|proc|pub|pure|ref|return|self|sizeof|static|struct|super|trait|type|typeof|unsafe|unsized|use|virtual|where|while|yield)\\b' },
         { token: 'storage.type.source.rust',
           regex: '\\b(?:Self|isize|usize|char|bool|u8|u16|u32|u64|f16|f32|f64|i8|i16|i32|i64|str|option|either|c_float|c_double|c_void|FILE|fpos_t|DIR|dirent|c_char|c_schar|c_uchar|c_short|c_ushort|c_int|c_uint|c_long|c_ulong|size_t|ptrdiff_t|clock_t|time_t|c_longlong|c_ulonglong|intptr_t|uintptr_t|off_t|dev_t|ino_t|pid_t|mode_t|ssize_t)\\b' },
         { token: 'variable.language.source.rust', regex: '\\bself\\b' },
         
         { token: 'comment.line.doc.source.rust',
           regex: '//!.*$' },
         { token: 'comment.line.double-dash.source.rust',
           regex: '//.*$' },
         { token: 'comment.start.block.source.rust',
           regex: '/\\*',
           stateName: 'comment',
           push: 
            [ { token: 'comment.start.block.source.rust',
                regex: '/\\*',
                push: 'comment' },
              { token: 'comment.end.block.source.rust',
                regex: '\\*/',
                next: 'pop' },
              { defaultToken: 'comment.block.source.rust' } ] },
         
         { token: 'keyword.operator',
         // `[*/](?![*/])=?` is separated because `//` and `/* */` become comments and must be
         // guarded against. This states either `*` or `/` may be matched as long as the match
         // it isn't followed by either of the two. An `=` may be on the end.
           regex: /\$|[-=]>|[-+%^=!&|<>]=?|[*/](?![*/])=?/ },
         { token : "punctuation.operator", regex : /[?:,;.]/ },
         { token : "paren.lparen", regex : /[\[({]/ },
         { token : "paren.rparen", regex : /[\])}]/ },
         { token: 'constant.language.source.rust',
           regex: '\\b(?:true|false|Some|None|Ok|Err)\\b' },
         { token: 'support.constant.source.rust',
           regex: '\\b(?:EXIT_FAILURE|EXIT_SUCCESS|RAND_MAX|EOF|SEEK_SET|SEEK_CUR|SEEK_END|_IOFBF|_IONBF|_IOLBF|BUFSIZ|FOPEN_MAX|FILENAME_MAX|L_tmpnam|TMP_MAX|O_RDONLY|O_WRONLY|O_RDWR|O_APPEND|O_CREAT|O_EXCL|O_TRUNC|S_IFIFO|S_IFCHR|S_IFBLK|S_IFDIR|S_IFREG|S_IFMT|S_IEXEC|S_IWRITE|S_IREAD|S_IRWXU|S_IXUSR|S_IWUSR|S_IRUSR|F_OK|R_OK|W_OK|X_OK|STDIN_FILENO|STDOUT_FILENO|STDERR_FILENO)\\b' },
         { token: 'meta.preprocessor.source.rust',
           regex: '\\b\\w\\(\\w\\)*!|#\\[[\\w=\\(\\)_]+\\]\\b' },
         { token: 'constant.numeric.integer.source.rust',
           regex: '\\b(?:[0-9][0-9_]*|[0-9][0-9_]*(?:u|us|u8|u16|u32|u64)|[0-9][0-9_]*(?:i|is|i8|i16|i32|i64))\\b' },
         { token: 'constant.numeric.hex.source.rust',
           regex: '\\b(?:0x[a-fA-F0-9_]+|0x[a-fA-F0-9_]+(?:u|us|u8|u16|u32|u64)|0x[a-fA-F0-9_]+(?:i|is|i8|i16|i32|i64))\\b' },
         { token: 'constant.numeric.binary.source.rust',
           regex: '\\b(?:0b[01_]+|0b[01_]+(?:u|us|u8|u16|u32|u64)|0b[01_]+(?:i|is|i8|i16|i32|i64))\\b' },
         { token: 'constant.numeric.float.source.rust',
           regex: '[0-9][0-9_]*(?:f32|f64|f)|[0-9][0-9_]*[eE][+-]=[0-9_]+|[0-9][0-9_]*[eE][+-]=[0-9_]+(?:f32|f64|f)|[0-9][0-9_]*\\.[0-9_]+|[0-9][0-9_]*\\.[0-9_]+(?:f32|f64|f)|[0-9][0-9_]*\\.[0-9_]+%[eE][+-]=[0-9_]+|[0-9][0-9_]*\\.[0-9_]+%[eE][+-]=[0-9_]+(?:f32|f64|f)' } ] }
    
    this.normalizeRules();
};

RustHighlightRules.metaData = { fileTypes: [ 'rs', 'rc' ],
      foldingStartMarker: '^.*\\bfn\\s*(\\w+\\s*)?\\([^\\)]*\\)(\\s*\\{[^\\}]*)?\\s*$',
      foldingStopMarker: '^\\s*\\}',
      name: 'Rust',
      scopeName: 'source.rust' }


oop.inherits(RustHighlightRules, TextHighlightRules);

exports.RustHighlightRules = RustHighlightRules;
});
