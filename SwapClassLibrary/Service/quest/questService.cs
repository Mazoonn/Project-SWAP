using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SwapClassLibrary.EF;
using SwapClassLibrary.DTO;

namespace SwapClassLibrary.Service
{
    public class QuestService
    {
        public static void AddNewQuest(QuestDTO quest)
        {
            SwapDbConnection db = new SwapDbConnection();
            r_place_sub_and_main_category placeCategories;
            place place;
            List<place> places;
            quest newQuest = new quest
            {
                client_id = quest.userId,
                creation_date = DateTime.Now,
                quest_id = IdService.generateID("quest_id"),
                places = new List<place>()
            };

            foreach (GooglePlaceDTO googlePlace in quest.googlePlaces)
            {
                place = db.places.FirstOrDefault(p => p.place_id == googlePlace.googlePlace.place_id);
                if (place != null)
                {
                    placeCategories = place.r_place_sub_and_main_category.FirstOrDefault(p => p.main_id == googlePlace.main_id &&
                    p.sub_id == googlePlace.sub_id);
                    if (placeCategories == null) place.r_place_sub_and_main_category.Add(new r_place_sub_and_main_category
                    {
                        creation_date = DateTime.Now,
                        main_id = googlePlace.main_id,
                        place_id = googlePlace.googlePlace.place_id,
                        sub_id = googlePlace.sub_id
                    });
                }
                else
                {
                    place = new place
                    {
                        latitude = googlePlace.googlePlace.latitude,
                        place_id = googlePlace.googlePlace.place_id,
                        longitude = googlePlace.googlePlace.longitude,
                        country = googlePlace.googlePlace.country,
                        creation_date = DateTime.Now,
                        description = googlePlace.googlePlace.description,
                        name = googlePlace.googlePlace.name,
                        post_code = googlePlace.googlePlace.post_code,
                        settlement = googlePlace.googlePlace.settlement,
                        state = googlePlace.googlePlace.state,
                        street = googlePlace.googlePlace.street,
                        street_number = googlePlace.googlePlace.street_number,
                        r_place_sub_and_main_category = new List<r_place_sub_and_main_category>
                            {
                                new r_place_sub_and_main_category
                                {
                                    creation_date = DateTime.Now,
                                    place_id = googlePlace.googlePlace.place_id,
                                    main_id = googlePlace.main_id,
                                    sub_id = googlePlace.sub_id
                                }
                            }
                    };
                        db.places.Add(place);
                }
                newQuest.places.Add(place);
            }
            places = db.places.Where(p => quest.eventsIds.Contains(p.place_id) 
            || quest.businessesIds.Contains(p.place_id)).ToList();
            newQuest.places= newQuest.places.Concat(places).ToList();
            db.quests.Add(newQuest);
            db.SaveChanges();
        }
    }
}
