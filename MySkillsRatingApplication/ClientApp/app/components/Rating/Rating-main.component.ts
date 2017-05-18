import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormsModule } from '@angular/forms';
import { Skills } from './Skills';
import { RatingService } from './rating.service';

@Component({
    selector: 'RatingMain',
    template: require('./Rating-main.component.html'),
    styles: [require('./Rating-main.component.css')]
})

export class mainRatingComponent extends OnInit {

    subscription: Subscription;
    skills: Skills[];
    model = new Skills(0, '', 0);

    Refresh() {
        this._service.LoadData().then(data => {
            this.skills = data;
        })
    }

    ngOnInit() {
        this.Refresh();
    }

    constructor(private _service: RatingService) {
        super();
        this.subscription = _service.RegenerateData$.subscribe(
            mission => {
                console.log("Good !! ", mission);
                this.Refresh();
            });
    }

    AddSkill() {
        if (!this.model.description)
            return;

        console.log("Sumbitted Form ! ");
        this._service.Add(this.model).then(data => {
            this._service.AnnounceChange(1212);
            console.log("Adding New Skill ! ");
            this.Refresh();
            this.model = new Skills(0, '', 0);
            
        })
    }

    onUpdate(elem: Skills) {
        console.log(elem);
        this._service.Update(elem).then(data => { })
        console.log('Update Successfull!');
    }

    onDelete(elem: Skills) {

        console.log(elem);
        this._service.Delete(elem.id).then(data => {
            let index: number = this.skills.indexOf(elem);
            this.skills.splice(index, 1);
            console.log("Delete Successfull ! ");
        })
    }

    ngOnDestroy() {
        // prevent memory leak when component destroyed
        this.subscription.unsubscribe();
    }
}