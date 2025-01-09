import { NgModule } from "@angular/core";
import { AlphanumericDirective } from "./alphanumeric.directive";
import { DecimalDirective } from "./decimal.directive";
import { LettersDirective } from "./letters.directive";
import { NumericDirective } from "./numeric.directive";
import { UppercaseInputDirective } from "./uppercase.directive";



        @NgModule({
          declarations: [
            AlphanumericDirective,
            NumericDirective,
            DecimalDirective,
            LettersDirective,
            UppercaseInputDirective
          ],
          exports:[
            AlphanumericDirective,
            NumericDirective,
            DecimalDirective,
            LettersDirective,
            UppercaseInputDirective
          ],
          imports: [
          ]
        })
        export class DirectiveModule { }
