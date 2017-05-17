import { Component, Input } from '@angular/core';

import { Skills } from './Skills';

@Component({
    selector: 'Rating-options',
    template: require('./Rating-options.component.html')
})

export class RatingoptionsComponent {
    @Input() item: Skills;

    onRatingChange(item: Skills, newRate: number) {
        item.rating = newRate;
    }
}
