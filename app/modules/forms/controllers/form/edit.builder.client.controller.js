'use strict';

/* jshint -W098 */
angular.module('forms').controller('Forms.Form.Edit.BuilderController',
  function ($scope, $state, $filter, toastr, form, SCForm, SGDialog) {

    $scope.working = false;

    $scope.view = {
      form: form
    };

    $scope.view.elementToCreate = {
      selected: undefined,
      section: $scope.view.form.SCSection().$build(),

      question: undefined,
      sectionComboSelected: undefined,

      clear: function () {
        this.selected = undefined;
        this.section = $scope.view.form.SCSection().$build();
        this.question = undefined;
        this.type = undefined;
      }
    };
    $scope.setOperation = function(element, type) {
      $scope.view.elementToCreate.selected = element;
      if(type) {
        $scope.view.elementToCreate.question = {};
        $scope.view.elementToCreate.question.question = type.toUpperCase();
      }
    };

    // Sections utils
    $scope.sections = [];
    $scope.loadSections = function () {
      $scope.view.form.SCSection().$getAll().then(function (response) {
        $scope.sections = [];
        addSection(response);
      });
    };
    $scope.loadSections();

    var findSectionById = function (sectionId) {
      for (var i = 0; i < $scope.sections.length; i++) {
        if($scope.sections[i].id == sectionId)
          return $scope.sections[i];
      }
    };
    var addSection = function (section) {
      if (!angular.isArray(section)) {
        reloadSection(section);
        $scope.sections = $filter('orderBy')($scope.sections.concat([section]), 'number');
      } else {
        for (var i = 0; i < section.length; i++) {
          addSection(section[i]);
        }
      }
    };
    var reloadSection = function(section) {
      $scope.view.form.SCSection().$new(section.id).SCQuestion().$getAll().then(function(response) {
        section.questions = response;
      });
    };
    var removeSection = function (index) {
      $scope.sections.splice(index, 1);
    };
    var removeQuestion = function (section, index) {
      section.questions.splice(index, 1);
    };

    // Navbar methods
    $scope.createSectionElement = function () {
      $scope.working = true;
      $scope.view.elementToCreate.section.$save().then(
        function (response) {
          $scope.working = false;
          toastr.success('Seccion guardada');
          addSection(response);
          $scope.view.elementToCreate.clear();
        },
        function error(err) {
          $scope.working = false;
          toastr.error(err.data.errorMessage);
        }
      );
    };

    $scope.createQuestionElement = function () {
      $scope.working = true;
      var section = $scope.view.elementToCreate.sectionComboSelected;
      var question = $scope.view.form.SCSection().$new(section.id).SCQuestion().$build();

      var questionToSave = angular.extend(question, $scope.view.elementToCreate.question);
      questionToSave.section = undefined;

      questionToSave.$save().then(
        function (response) {
          $scope.working = false;
          toastr.success('Pregunta guardada');
          $scope.view.elementToCreate.clear();
          reloadSection(findSectionById(section.id));
        },
        function error(err) {
          $scope.working = false;
          toastr.error(err.data.errorMessage);
        }
      );
    };


    // Sections parts
    $scope.updateSection = function(section){
      $scope.working = true;

      var sectionToUpdate = angular.copy(section);
      sectionToUpdate.isEditing = undefined;
      sectionToUpdate.questions = undefined;

      sectionToUpdate.$save().then(
        function (response) {
          $scope.working = false;
          toastr.success('Seccion guardada');
          section.isEditing = false;
        },
        function error(err) {
          $scope.working = false;
          toastr.error(err.data.errorMessage);
        }
      );
    };
    $scope.updateQuestion = function(section, question){
      $scope.working = true;

      var questionToUpdate = $scope.view.form.SCSection().$new(section.id).SCQuestion().$new(question.id);
      questionToUpdate = angular.extend(questionToUpdate, question);

      questionToUpdate.isEditing = undefined;

      questionToUpdate.$save().then(
        function (response) {
          $scope.working = false;
          toastr.success('Pregunta guardada');
          question.isEditing = false;
        },
        function error(err) {
          $scope.working = false;
          toastr.error(err.data.errorMessage);
        }
      );
    };

    $scope.removeSection = function(section, index){
      SGDialog.confirmDelete(section.title, 'seccion', function () {
        $scope.working = true;
        section.$remove().then(
          function (response) {
            $scope.working = false;
            toastr.success('Seccion eliminada');
            removeSection(index);
          },
          function error(err) {
            $scope.working = false;
            toastr.error(err.data.errorMessage);
          }
        );
      });
    };
    $scope.removeQuestion = function(section, question, index){
      SGDialog.confirmDelete(question.title, 'pregunta', function () {
        $scope.working = true;
        var questionToRemove = $scope.view.form.SCSection().$new(section.id).SCQuestion().$new(question.id);
        questionToRemove.$remove().then(
          function (response) {
            $scope.working = false;
            toastr.success('Pregunta eliminada');
            removeQuestion(section, index);
          },
          function error(err) {
            $scope.working = false;
            toastr.error(err.data.errorMessage);
          }
        );
      });
    };

  });
